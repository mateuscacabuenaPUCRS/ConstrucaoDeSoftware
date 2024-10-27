import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EvaluationDTO } from '../dto/evaluation.dto';
import { SubmitEvaluationDTO } from '../dto/submit-evaluation.dto';
import { EvaluationEntity } from '../entity/evaluation.entity';

@Injectable()
export class EvaluationRepository {
  constructor(
    @InjectRepository(EvaluationEntity)
    private readonly evaluationRepository: Repository<EvaluationEntity>,
  ) {}

  private toEvaluationDTO({ id, rating, comment, createdAt, transactionId, sellerId }: EvaluationEntity): EvaluationDTO {
    return { id, rating, comment, createdAt, transactionId, sellerId };
  }
  
  async getAll(sellerId: number): Promise<EvaluationDTO[]> {
    const evaluations = await this.evaluationRepository.find({ where: { sellerId } });
    return evaluations.map(this.toEvaluationDTO);
  }

  async add(submitEvaluationDTO: SubmitEvaluationDTO): Promise<EvaluationDTO> {
    const evaluation = this.evaluationRepository.create(submitEvaluationDTO);
    await this.evaluationRepository.save(evaluation);
    return this.toEvaluationDTO(evaluation);
  }
}
