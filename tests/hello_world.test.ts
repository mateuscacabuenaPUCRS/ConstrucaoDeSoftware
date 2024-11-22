import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { lambdaHandler } from '../app';
import { expect, describe, it } from '@jest/globals';
import helloWorldEvent from '../events/hello_world.json'

describe('HelloWorld Lambda Function', function () {
    it('should return a successful response', async () => {
        const event: APIGatewayProxyEvent = helloWorldEvent as any;
        const result: APIGatewayProxyResult = await lambdaHandler(event);

        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual(
            JSON.stringify({
                message: 'hello world',
            }),
        );
    });
});
