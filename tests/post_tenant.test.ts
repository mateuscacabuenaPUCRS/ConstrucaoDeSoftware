import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { lambdaHandler } from '../src/main';
import { expect, describe, it } from '@jest/globals';
import postTenantEvent from '../lambda/events/post_tenant.json';

describe('PostTenant Lambda Function', function () {
    it.skip('should return a successful response', async () => {
        const event: APIGatewayProxyEvent = postTenantEvent as any;
        const result: APIGatewayProxyResult = await lambdaHandler(event);

        expect(result.statusCode).toEqual(200);
        expect(JSON.parse(result.body)).toHaveProperty('id');
    });
});
