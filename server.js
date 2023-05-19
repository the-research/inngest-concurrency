const express = require('express');
const { Inngest } = require('inngest');
const { serve } = require("inngest/express");

process.env.INNGEST_EVENT_KEY = 'local';

const app = express();
const inngest = new Inngest({ name: "My App" });

app.use(express.json());
app.use(
    "/api/inngest",
    serve(inngest, [step1(), step2()])
)

function step1() {
    return inngest.createFunction(
        {name: `step1`},
        {event: `step1-requested`},
        async ({event, step}) => {
            const missions = [];
            for (let counter = 0; counter <= 10; counter++) {
                missions.push({
                    name: "step2-requested",
                    data: {
                        counter
                    }
                })
            }
            await step.sendEvent(missions);
            return {name: "step1"};
        }
    );
}

function step2() {
    return inngest.createFunction(
        {name: `step2`, concurrency: 2},
        {event: `step2-requested`},
        async ({event, step}) => {
            await step.sleep('3s');
            console.log(`Hello from counter: ${event.data.counter}`);
            return { counter: event.data.counter };
        }
    );
}


const PORT = 3002;
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));