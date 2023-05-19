## CONCURRENCY BUG

### What I am trying to do?
Create 2 functions:
1. Step1 - Will trigger Step2 10 times
2. Step2 - Will run with concurrency of 2.

### Expected Behaviour
To see Step2 run with concurrency of 2.
Should finish in 15 seconds (10 missions / 2 concurrently * 3 seconds sleep => ~15 seconds).

### Actual Behaviour
Step2 run everything at once, both in local & production, thus, it finish everything in 3 seconds instead of ~15 seconds.

### How to run?
1. npm start
2. Open http://127.0.0.1:8288
3. Click "Send event" and set "name" to "step1-requested"
4. You will send 10 missions working and all of them will finish in 3 seconds (instead of ~15 seconds)

Thanks
