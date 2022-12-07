# Stream Response Analysis

Test streams with NodeJs in order to test performance KPIs of responses

## Start

```shell
npm install
npm run create:data
npm start
```

Create:data command will create big json files in the DataSource folder that will be returned in the endpoints.
Feel free to execute the `create:data` script with different parameters in order to create files with different sizes.

## Measuring responses

```shell
$ ab -n 100 -c 10 http://localhost:3000/dataset
$ ab -n 100 -c 10 http://localhost:3000/dataset/stream/default
```

* Data with 96.7 MB: no-stream average 104ms; with-stream average 53ms;
* Data with 26.4 MB: no-stream average 21ms; with-stream average 15ms;
* Data with 10.6 MB: no-stream average 7ms; with-stream average 6.2ms;
* Data with  4.9 MB: no-stream average 4ms; with-stream average 2.5ms;

| Data Size | μ No-Stream | μ With-Stream |
|-----------|-------------|---------------|
| 96.7 MB   | 104 ms      | 53 ms         |
| 26.4 MB   | 21 ms       | 15 ms         |
| 10.6 MB   | 7 ms        | 6.2ms         |
| 4.9 MB    | 4 ms        | 2.5 ms        |

First conclusion:
The use of stream makes the average response time always faster, but larger the data to be returned, bigger the
performance benefit. Another observation: larger the data volume gets, the use of stream reduces process picks
in the computer's processors.

## References:
- https://therootcompany.com/blog/pipe-node-streams-the-right-way/
- https://node.dev/post/understanding-streams-in-node-js
- https://dev.to/mariokandut/how-to-stream-to-an-http-response-in-nodejs-dem
- https://www.tutorialspoint.com/apache_bench/apache_bench_quick_guide.htm