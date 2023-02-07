import {AppDataSource} from "../config/data-source";
import AssistantEntity from "../entities/assistant.entity";
import {isEmpty} from "../utils/util";
import {HttpException} from "../exceptions/HttpException";
import {CreateAssistantDto} from "../dtos/assistant.dto";
import {TutorEntity} from "../entities/tutors.entity";
import {Assistant} from "../interfaces/assistant.interface";

class AssistantService {
    public async findAllAssistants(): Promise<Assistant[]> {
        const assistants: Assistant[] = await AppDataSource.getRepository(AssistantEntity).find();
        return assistants;
    }

    public async findAssistantById(assistantId: number): Promise<Assistant> {
        if (isEmpty(assistantId)) throw new HttpException(400, "assistantId is empty");
        const findAssistant = await AssistantEntity.findOne({where: {assistant_id: assistantId}, relations: {tutor: true}});

        if (!findAssistant) throw new HttpException(409, "Teacher doesn't exist");
        return findAssistant;
    }

    public async createAssistant(assistantData: CreateAssistantDto): Promise<Assistant> {
        if (isEmpty(assistantData)) throw new HttpException(400, "assistantData is empty");

        const findTutor = await TutorEntity.findOne({where: {tutor_id: assistantData.tutor_id}});
        if (!findTutor) throw new HttpException(409, "Tutor doesn't exist");

        const createAssistantData: Assistant = await AssistantEntity.create({...assistantData}).save();
        return createAssistantData;
    }

    public async updateAssistant(assistantId: number, assistantData: CreateAssistantDto): Promise<Assistant> {
        if (isEmpty(assistantId)) throw new HttpException(400, "assistantId is empty");
        if (isEmpty(assistantData)) throw new HttpException(400, "assistantData is empty");

        const findAssistant = await AssistantEntity.findOne({where: {assistant_id: assistantId}, relations: {tutor: true}});
        if (!findAssistant) throw new HttpException(409, "Assistant doesn't exist");

        await AssistantEntity.update(assistantId, {...assistantData});

        const updateAssistantData: Assistant = await AssistantEntity.findOne({
            where: {assistant_id: assistantId},
            relations: {tutor: true}
        });
        return updateAssistantData;
    }

    public async deleteAssistant(assistantId: number): Promise<Assistant> {
        if (isEmpty(assistantId)) throw new HttpException(400, "assistantId is empty");

        const findAssistant = await AssistantEntity.findOne({where: {assistant_id: assistantId}, relations: {tutor: true}});
        if (!findAssistant) throw new HttpException(409, "Teacher doesn't exist");

        await AssistantEntity.delete(assistantId);
        return findAssistant;
    }
}

export default AssistantService;