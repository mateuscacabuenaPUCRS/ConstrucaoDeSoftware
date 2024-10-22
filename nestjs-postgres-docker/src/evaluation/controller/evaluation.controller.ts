import { Controller, Get, Post, Body, Param, HttpException, HttpStatus } from "@nestjs/common";
import { ApiTags } from '@nestjs/swagger';
import { EvaluationService } from "../service/evaluation.service";
import { EvaluationDTO } from "../dto/evaluation.dto";
import { SubmitEvaluationDTO } from "../dto/submit-evaluation.dto";

@ApiTags("Evaluation")
@Controller("evaluation")
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @Get(":sellerId")
  async getAll(@Param("sellerId") sellerId: number): Promise<EvaluationDTO[]> {
    try {
      return await this.evaluationService.getAll(sellerId);
    } catch (error) {
      throw new HttpException('Failed to get seller evaluations', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async submitEvaluation(@Body() submitEvaluationDTO: SubmitEvaluationDTO): Promise<EvaluationDTO> {
    try {
      if (!submitEvaluationDTO.transactionId || !submitEvaluationDTO.sellerId) {
        throw new HttpException('Evaluation transaction and seller is required', HttpStatus.BAD_REQUEST);
      }

      return await this.evaluationService.submitEvaluation(submitEvaluationDTO);
    } catch (error) {
      if (error.status === HttpStatus.BAD_REQUEST) {
        throw error;
      }

      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }

      throw new HttpException('Failed to submit evaluation', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
