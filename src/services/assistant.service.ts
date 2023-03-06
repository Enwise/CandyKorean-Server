import { AppDataSource } from '../config/data-source'
import AssistantEntity from '../entities/assistant.entity'
import { isEmpty } from '../utils/util'
import { HttpException } from '../exceptions/HttpException'
import { CreateAssistantDto } from '../dtos/assistant.dto'
import { Assistant } from '../interfaces/assistant.interface'
import { CourseEntity } from '../entities/courses.entity'

class AssistantService {
  public async findAllAssistants (): Promise<Assistant[]> {
    const assistants: Assistant[] = await AppDataSource.getRepository(AssistantEntity).find({relations: {courses: true}})
    return assistants
  }

  public async findAssistantById (assistantId: number): Promise<Assistant> {
    if (isEmpty(assistantId)) throw new HttpException(400, 'assistantId is empty')
    const findAssistant = await AssistantEntity.findOne({
      where: { assistant_id: assistantId },
      relations: { courses: true }
    })

    if (!findAssistant) throw new HttpException(409, 'Assistant doesn\'t exist')
    return findAssistant
  }

  public async findAssistantsByCourseId (courseId: number): Promise<CourseEntity[]> {
    if (isEmpty(courseId)) throw new HttpException(400, 'courseId is empty')
    const findCourse = await CourseEntity.find({ where: { course_id: courseId }, relations: { assistants: true } })

    if (!findCourse) throw new HttpException(409, 'Assistant doesn\'t exist')

    return findCourse
  }

  public async createAssistant (assistantData: CreateAssistantDto): Promise<Assistant> {
    if (isEmpty(assistantData)) throw new HttpException(400, 'assistantData is empty')

    const findCourse = await CourseEntity.findOne({ where: { course_id: assistantData.course_id } })
    if (!findCourse) throw new HttpException(400, 'Course doesn\'t exist')

    const createAssistantData: Assistant = await AssistantEntity.create({
      ...assistantData,
      courses: [findCourse]
    }).save()
    return createAssistantData
  }

  public async updateAssistant (assistantId: number, assistantData: CreateAssistantDto): Promise<Assistant> {
    if (isEmpty(assistantId)) throw new HttpException(400, 'assistantId is empty')
    if (isEmpty(assistantData)) throw new HttpException(400, 'assistantData is empty')

    const findAssistant = await AssistantEntity.findOne({
      where: { assistant_id: assistantId },
      relations: { courses: true }
    })
    if (!findAssistant) throw new HttpException(409, 'Assistant doesn\'t exist')

    const findCourse = await CourseEntity.findOne({ where: { course_id: assistantData.course_id } })
    if (!findCourse) throw new HttpException(400, 'Course doesn\'t exist')

    findAssistant.courses = [...findAssistant.courses, findCourse]
    await findAssistant.save();
    // await AssistantEntity.update(assistantId, { ...assistantData, courses: [...findAssistant.courses, findCourse] })

    const updateAssistantData: Assistant = await AssistantEntity.findOne({
      where: { assistant_id: assistantId },
      relations: { courses: true }
    })
    return updateAssistantData
  }

  public async deleteAssistant (assistantId: number): Promise<Assistant> {
    if (isEmpty(assistantId)) throw new HttpException(400, 'assistantId is empty')

    const findAssistant = await AssistantEntity.findOne({
      where: { assistant_id: assistantId },
      relations: { courses: true }
    })
    if (!findAssistant) throw new HttpException(409, 'Teacher doesn\'t exist')

    await AssistantEntity.delete(assistantId)
    return findAssistant
  }
}

export default AssistantService