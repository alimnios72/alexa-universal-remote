'use strict';

const uuid = require('uuid');
const moment = require('moment');
const defer = require('pinkie-defer');

module.exports = options => {
    const id = uuid.v1();
    const stream = uuid.v4().replace(/-/g, '');

    const opts = Object.assign({
        region: 'us-west-1',
        account: '123456789012',
        functionName: 'aws-lambda-mock-context',
        functionVersion: '$LATEST',
        memoryLimitInMB: '128',
        timeout: 3
    }, options);

    const deferred = defer();

    const start = Date.now();
    let end;

    const context = {
        callbackWaitsForEmptyEventLoop: true,
        functionName: opts.functionName,
        functionVersion: opts.functionVersion,
        invokedFunctionArn: `arn:aws:lambda:${opts.region}:${opts.account}:function:${opts.functionName}:${opts.alias || opts.functionVersion}`,
        memoryLimitInMB: opts.memoryLimitInMB,
        awsRequestId: id,
        invokeid: id,
        logGroupName: `/aws/lambda/${opts.functionName}`,
        logStreamName: `${moment().format('YYYY/MM/DD')}/[${opts.functionVersion}]/${stream}`,
        getRemainingTimeInMillis: () => {
            const endTime = end || Date.now();
            const remainingTime = (opts.timeout * 1000) - (endTime - start);

            return Math.max(0, remainingTime);
        },
        succeed: result => {
            console.log('#######succeed');
            end = Date.now();

            deferred.resolve(result);
        },
        fail: err => {
            console.log('#######fail');
            end = Date.now();

            if (typeof err === 'string') {
                err = new Error(err);
            }

            deferred.reject(err);
        },
        done: (err, result) => {
            console.log('#######done');
            if (err) {
                context.fail(err);
                return;
            }

            context.succeed(result);
        },
        Promise: new Promise(deferred)
    };

    setTimeout(() => {
        if (context.getRemainingTimeInMillis() === 0) {
            context.fail(new Error(`Task timed out after ${opts.timeout}.00 seconds`));
        }
    }, opts.timeout * 1000);

    return context;
};