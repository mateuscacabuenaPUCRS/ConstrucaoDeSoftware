import { Injectable } from "@nestjs/common";
import { EvaluationRepository } from "../repository/evaluation.repository";
import { EvaluationDTO } from "../dto/evaluation.dto";
import { SubmitEvaluationDTO } from "../dto/submit-evaluation.dto";
import { UserRepository } from "../../user/repository/user.repository";
import { TenantRepository } from "../../tenant/repository/tenant.repository";

@Injectable()
export class EvaluationService {
  constructor(
    private readonly evaluationRepository: EvaluationRepository,
    private readonly userRepository: UserRepository,
    private readonly tenantRepository: TenantRepository,
  ) {}

  async getAll(sellerId: number): Promise<EvaluationDTO[]> {
    return this.evaluationRepository.getAll(sellerId);
  }

  async submitEvaluation(submitEvaluationDTO: SubmitEvaluationDTO): Promise<EvaluationDTO> {
    if (!submitEvaluationDTO.rating || submitEvaluationDTO.rating < 1 || submitEvaluationDTO.rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }

    const seller = await this.userRepository.getById(submitEvaluationDTO.sellerId);
    if (!seller) {
      throw new Error('Seller not found');
    }

    const sellerTenant = await this.tenantRepository.getById(seller.tenantId);
    if (!sellerTenant) {
      throw new Error('Seller tenant not found');
    }

    if (!sellerTenant.name.toLowerCase().includes("seller")) {
      throw new Error('Seller tenant is not really a seller');
    }

    return this.evaluationRepository.add(submitEvaluationDTO);
  }
}
