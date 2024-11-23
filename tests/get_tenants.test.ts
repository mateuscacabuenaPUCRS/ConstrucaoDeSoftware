import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { lambdaHandler } from '../src/main';
import { expect, describe, it } from '@jest/globals';
import getTenantsEvent from '../lambda/events/get_tenants.json';

describe('GetTenants Lambda Function', function () {
    it.skip('should return a successful response', async () => {
        const event: APIGatewayProxyEvent = getTenantsEvent as any;
        const result: APIGatewayProxyResult = await lambdaHandler(event);

        expect(result.statusCode).toEqual(200);
        expect(Array.isArray(JSON.parse(result.body))).toBe(true);
        expect(JSON.parse(result.body).length).toBeGreaterThan(0);
    });
});
