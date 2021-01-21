---
title: Load Testing
---


# Load testing

Load testing is an important part of installation, it helps to give confidence that the system is setup and configured to scale with the needs of the organisation.

It also helps us to identify the key scaling properties - e.g. is it CPU, I/O or network bound - in order to tune autoscaling, metrics and alarms.

## Calculating base usage

There is no easy answer on how many requests per second should the system be able to handle, but the simplest approach is to base it off the number of CI builds and releases you perform on your busiest day.

If you can imagine a histogram of these builds with time as the x-axis, and number of builds on the y-axis, you can take the peak number and use that as your baseline "concurrent users" metric.

A starting point of being able to handle 10 concurrent users (builds) is a good start, as each build will usually perform several API calls.

It's worth pointing out that each real CI build will usually span multiple minutes, and only a fraction of the build time will be dedicated Pact and communicting with Pactflow directly.

## Running a load test

We have created a tool that you can use to run a load test on your platform.

Using the metric from above, the load testing tool maps to a random scenario (which may perform multiple API calls to Pactflow), attempting to create a more realistic system load.

You can download and run the tool from: https://github.com/pactflow/pactflow-load-test