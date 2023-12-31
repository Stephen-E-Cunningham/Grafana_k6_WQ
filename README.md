# Grafana k6 for WQ

This is a beginning script that utilizes Grafana k6 to performance test the graphql/API for the WQ repository. 
The script employs a lightweight graphql api call that serves as a proof of concept for Grafana k6 and performance testing.

# Set Up
Make sure you have elasticsearch and the API for WQ set up and running. Here is the link: https://github.com/department-of-veterans-affairs/bip-work-queue-query

# Grafana k6 Installation
Installation is straightforward. But <br />
Mac users: <br />
 * you can use homebrew `brew install k6`

   <br />
Windows Users:
 * Use chocolatey or choco `choco install k6`. <br />
 * Alternatively, use `winget install k6`.

Commands can be found here https://k6.io/docs/get-started/installation/.
I did not have much luck downloading through Docker but, that does not mean it is impossible. Feel free to use the example test as a guide/reference.

# Grafana k6 Testing
The script in this repo uses the url and query from Perry's video here: https://boozallen-my.sharepoint.com/:v:/g/personal/582303_bah_com/EQNBn-HbW9dGhiK1S9hy85sBL__kVSao6-Sv5dR8_MrWCQ
Briefly, 
* this script has the JWT from the UI (https://work-queue-ui-dev.dev.bip.va.gov/) in the network tab.
* The data is stringified JSON being sent.
* The url `http://localhost:8080/api/graphql` is from the 'Run' readout from the WQ API 
* And the headers are provided in the script.
* The "options" object is built-in to k6 with more information here: https://k6.io/docs/using-k6/k6-options/how-to/
* The options in this example has 10 users (vus) that make 20 iterations (requests) each based on the "executor" property built into k6.
* Based on those metrics, we will have a total of 200 iterations or requests. 
* With the sleep set to 0.5seconds or 500 ms, we would expect 2 iterations/second times 10 users = 20 iterations (requests) per second
* The actual readout may reach but not sustain the 20 iterations per second based on ineffeciencies of idling vus (simulated users) that made a fast request.

# Grafana k6 Visualization of Data
Visualization is made easy with `xk6`. To install, make sure you have `Go` or `Golang` on your computer. 
* Then type this command `go install go.k6.io/xk6/cmd/xk6@latest` <br />
* Then build the binary `xk6 build --with github.com/szkiba/xk6-dashboard@latest` <br />
* Then make sure your tunnel is up. To get through proxy and get xk6 to automatically open your dashboard, use the following command
`HTTPS_PROXY=http://aideuser:aidepass@127.0.0.1:9443 ./k6 run --out dashboard=open script.js`
You should see a screen in your browser populate with the data. if not the default url is http://127.0.0.1:5665/
More information on visualization can be found here `https://k6.io/blog/ways-to-visualize-k6-results/`

