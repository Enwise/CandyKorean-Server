# CandyKorean
## 외국인들을 위한 한국어 학습 플랫폼

![image](https://github.com/Enwise/CandyKorean-Server/assets/49470452/3dee151c-c4e7-40a2-9950-dad55b3df72c)


## 목차
- [프로젝트 설명](#프로젝트-설명)
- [기술 스택](#기술-스택)
- [구현 핵심 기능 1 : 인앱 결제 오류 해결](#구현-핵심-기능-1-:-인앱-결제-오류-해결)
- [구현 핵심 기능 2 : 플레이 스토어 배포를 위한 빌드 문제 해결](#구현-핵심-기능-2-:-플레이-스토어-배포를-위한-빌드-문제-해결)
- [Google Play Store URL](#Google-Play-Store-URL)

## 프로젝트 설명
- 총 3개의 난이도로 수업 레벨이 구성되어 있고, 각 레벨에는 튜터와 각 튜터가 맡은 코스가 있습니다. 사용자는 원하는 코스를 선택하여 코스의 강의를 수강한 후, 퀴즈를 통해 본인의 한국어 능력을 시험해볼 수 있습니다. 또한, Premium 과정을 통해 튜터와의 1대1 Private Class를 수강할 수 있습니다.

- 구글 개발자 계정을 통해 완성된 앱을 플레이스토어의 심사를 거친 후에 배포하였습니다. 인앱 결제 기능을 구현하면서, JavaScript의 콜백함수, async 와 await 의 활용력을 기를 수 있었고, 실제 앱 배포를 통해 안드로이드 앱 개발에 필요한 빌드 능력을 갖추게 되었습니다.

## 기술 스택
- `React Native` 프레임워크를 활용하여 프론트엔드 개발 환경을 구축하였고, `Node.js` 을 사용하여 백엔드 API 을 만들었고 클라이언트 환경과 통신하는 로직을 구현하였습니다.
  
![image](https://github.com/Enwise/CandyKorean-Server/assets/49470452/9cddc07d-9b41-452a-b327-31a3dfec374f)  
*Google Play Console에 앱 등록*  

![image](https://github.com/Enwise/CandyKorean-Server/assets/49470452/f91f3957-b1ee-4698-ba96-b01ef432b6b6)  
*인앱 상품 메뉴에 등록한 결제 가능 강의들*  

  
- 인앱 결제 프로세스 구현을 위해 `Google Play Console` 에 `Expo` 라이브러리를 통해 빌드한 앱 결과물을 등록하였습니다. 그 후, 결제 가능한 강의들을 `인앱 상품` 에 등록한 후, `InAppPurchases` 기능과 연동하여 결제가 성공적으로 완료되도록 하였습니다.

## 구현 핵심 기능 1 : 인앱 결제 오류 해결

https://github.com/Enwise/CandyKorean-Server/assets/49470452/69bb6002-82fe-4f88-8f88-563604c33a03

*인앱 결제 시연 영상*
```javascript
...
...
try {
    
     // 구매 정보 가져오기
     const { responseCode, results } = await getProductsAsync(itemArray);

     if (responseCode === IAPResponseCode.OK) {
         setProductId(results[0].productId)
         setBottomText(results[0].productId);
         
     } else {
      setBottomText('something wrong!');
     }

     // 구매 내역에 없는 상품일때만 결제 진행
     if(purchasedCourseList.indexOf(itemInfo.course_id) === -1) {
      purchaseItemAsync(results[0].productId)
     } else {
      // 아닐떈, 바로 이미 구입한 상품이라고 알려주기
      navigation.navigate("PaymentResult", {
        user_id: userId,
        itemInfo: itemInfo,
        isSuccess: false,
        returnToClass,
        imgUrl: imgUrl,
        isBought: true,
      });
     }

     return await new Promise((resolve, reject) => {
      setPurchaseListener(async (result) => {
        if(result.responseCode === IAPResponseCode.OK){
          setBottomText("success")
          if(!result.results[0].acknowledged) {
            setBottomText('successful purchase')
            await finishTransactionAsync(result.results[0], false);

            // 계속 구매 가능한지 test 
            // await finishTransactionAsync(result.results[0], true);

            // DB에 저장 - purchasedCourse 에 없는 경우에만!
            if(purchasedCourseList.indexOf(itemInfo.course_id) === -1) {
            createPurchasedCourse(
              { user_id: userId, course_id: itemInfo.course_id },
              (d) => {
      
                navigation.navigate("PaymentResult", {
                  user_id: userId,
                  itemInfo: itemInfo,
                  isSuccess: true,
                  returnToClass,
                  imgUrl: imgUrl,
                });
              },
              setIsCoursePurchased,
              (e) => {
                setIsSuccess(false);
                console.log(e.message);
              }
            );
            } else {
              navigation.navigate("PaymentResult", {
                user_id: userId,
                itemInfo: itemInfo,
                isSuccess: true,
                returnToClass,
                imgUrl: imgUrl,
              });
            }
        }
        } else if (result.responseCode === IAPResponseCode.USER_CANCELED || result.responseCode === IAPResponseCode.DEFERRED) {
          setBottomText('User canceled the transaction');

        }  else {
          
          setBottomText(`Something went wrong with the purchase. Received errorCode ${result.errorCode}`);
            navigation.navigate("PaymentResult", {
            user_id: userId,
            itemInfo: itemInfo,
            isSuccess: false,
            returnToClass,
            imgUrl: imgUrl,
            isBought: result.errorCode === 8 ? true : false,
          });
        }
      })

    })

    } catch(e) {
      disconnectAsync();
      setBottomText('error!!!!!');

    }
...
...
```

*인앱 결제 로직 구현 코드*

- `Expo의 InAppPurchases 라이브러리`를 사용하여 인앱 결제 로직을 구현하기로 했지만, 구글 개발자 계정내에 등록된 인앱 결제 상품을 연결하는 절차까지만 성공하고 막상 결제는 계속해서 실패하였습니다. API 문서를 다시 한 번 정독하고, 코드 흐름을 꼼꼼하게 살펴본 결과 `상품을 구매하기 전에 필수적으로 불러야하는 콜백함수의 위치가 특정 화면 단이 아니라 전역 상태로 있어야 하는 사실`을 깨달았습니다.
- 위치를 옮기고나서, 구매 후의 결과 처리가 제대로 되지 않으면 향후 구매가 취소될 수 있기 때문에 이에 대한 코드를 다시 한 번 확실히 검토하였습니다. 결제 형태가 구독인지, 아니면 일회성 상품인지에 따라서도 다른 처리를 해줘야하기 때문에, 이를 잘 고려하여 최종적으로 기능 구현을 완료하였습니다.

- 인앱 상품 불러오기 부터 어떤 상품인지에 대한 확인 및 결제 후 처리까지 구현해보면서 `인앱 결제의 전체적인 프로세스` 잘 이해할 수 있었고, 향후 결제 관련 API 들을 사용할 때에도 이 경험을 잘 살려서 적용해볼 예정입니다.


## 구현 핵심 기능 2 : 플레이 스토어 배포를 위한 빌드 문제 해결

- 플레이 스토어에 등록 가능한 `안드로이드 앱` 형태로 빌드하기 위해 `Expo EAS Build` 를 통해 프로젝트를 빌드하려 했지만, 다음과 같은 문제가 발생하였습니다.

![image](https://github.com/Enwise/CandyKorean-Server/assets/49470452/08892fb6-cbba-4d36-ae4e-af7602cde3e1)  
*Expo EAS Build Error*
- `Plugin with id 'maven' not found.` : 
- `compiledSdkVersion is not specified` : 

## Google Play Store URL
- https://play.google.com/store/apps/details?id=com.candykorean.candykoreanapp&hl=ko
