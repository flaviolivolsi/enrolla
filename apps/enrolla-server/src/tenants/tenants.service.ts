import { HttpException, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { env } from 'process';
import { PrismaService } from '../prisma/prisma.service';
import { ApiToken } from './entities/api-token.entity';
import { CreateApiTokenInput } from './dto/create-api-token.input';
import { decrypt, encrypt } from '../utils/encryption.utils';

@Injectable()
export class TenantsService {
  private static ENCRYPTION_KEY = env.API_TOKEN_GENERATION_PRIVATE_KEY;

  constructor(private prismaService: PrismaService) {}

  async createApiToken(
    tenantId: string,
    createApiTokenInput: CreateApiTokenInput
  ): Promise<ApiToken> {
    const token = jwt.sign(
      { tenantId: tenantId },
      TenantsService.ENCRYPTION_KEY
    );

    const { encryptedData } = await encrypt(token);

    return await this.prismaService.apiToken.create({
      data: {
        token: encryptedData,
        name: createApiTokenInput.name,
        tenantId,
      },
    });
  }

  async getApiTokens(tenantId: string): Promise<ApiToken[]> {
    const tokens = await this.prismaService.apiToken.findMany({
      where: {
        tenantId,
      },
    });

    tokens.forEach(async (token) => {
      const decryptedData = await decrypt(token.token);
      token.token = decryptedData;
    });

    return tokens;
  }

  async deleteApiToken(tenantId: string, id: string) {
    return await this.prismaService.apiToken.delete({
      where: {
        id_tenantId: {
          id,
          tenantId,
        },
      },
    });
  }

  async validateApiToken(token: string) {
    try {
      const decoded = jwt.verify(token, TenantsService.ENCRYPTION_KEY);
      const { encryptedData } = await encrypt(token, 0);

      const apiToken = await this.prismaService.apiToken.findUnique({
        where: {
          token: encryptedData,
        },
      });

      if (!apiToken || apiToken.tenantId !== decoded['tenantId']) {
        throw new Error('Invalid API token');
      }

      return { tenantId: decoded['tenantId'] };
    } catch (error) {
      throw new HttpException('Unauthorized: Invalid API Token', 401);
    }
  }
}
