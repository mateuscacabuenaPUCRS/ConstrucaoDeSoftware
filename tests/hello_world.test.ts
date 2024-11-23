import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { lambdaHello } from '../src/main';
import { expect, describe, it } from '@jest/globals';
import helloWorldEvent from '../lambda/events/hello_world.json';

describe('HelloWorld Lambda Function', function () {
    it.skip('should return a successful response', async () => {
        const event: APIGatewayProxyEvent = helloWorldEvent as any;
        const result: APIGatewayProxyResult = await lambdaHello(event);

        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual(
            JSON.stringify({
                message: 'hello world',
            }),
        );
    });
});
