# js
### The dead simple and extremely fast cli tool for javasript

#### Usage
- evaluate input
  - `js 1 + 1` ➟ `2`
  - `js Math.random()` ➟ `4` (chosen by fair dice roll, guarenteed to be random)
- all the pipes
  - `cat weather.json | js stdin.temperature` ➟ `21c`
  - `curl httpbin.org/get -s | js stdin.origin | toilet -t | lolcat -ti`

