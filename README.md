<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->


<div align="center" width="100%">   
            
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
            
</div>
            
<!-- PROJECT LOGO -->


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/open-source-labs/Docketeer">
    <img src="assets/extended-dark.png" alt="Logo" width="550" height="auto">
  </a>
  <br />
  https://docketeer.io/
<br/>
  
   <br /> 
  <p align="center">
  Docketeer is a developer-friendly application that provides a single interface for container and network management as well as metric visualization.  
    <br />
    <a href="https://github.com/open-source-labs/Docketeer"><strong>Explore the code & contribute here!»</strong></a><br />
    <a href="https://github.com/open-source-labs/docketeer-extension"><strong>See the extension version's code here!»</strong></a>
    <br />
    <br />
    <a href="https://github.com/open-source-labs/Docketeer/issues">Report Bug</a>
    ·
    <a href="https://github.com/open-source-labs/Docketeer/issues">Request Feature</a>
  </p>
</div>

<br />
<!-- TABLE OF CONTENTS -->


## Table of Contents

  <ol>
    <li>
    <a href="#about-the-project">About Docketeer</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#in-development">In Development</a></li>
    <li><a href="#documentation">Documentation</a></li>
    <li><a href="#contributing">Contributing</a></li> 
    <li><a href="#license">License</a></li>
    <li><a href="#authors">Authors</a></li>
    <li><a href="#troubleshooting">Troubleshooting</a></li>
  </ol>

<!-- ABOUT THE PROJECT -->

## About The Project

<div align="center" width="100%">
            
[![Docker][Docker]][Docker-url][![Typescript][TS.js]][TS-url][![JavaScript][JavaScript]][JavaScript-url][![React][React.js]][React-url][![Redux][Redux]][Redux-url][![RTK][RTK]][RTK-url][![Node][Node.js]][Node-url][![Express][Express]][Express-url][![Redis][Redis]][Redis-url][![MongoDB][MongoDB]][MongoDB-url][![Postgres][Postgres]][Postgres-url][![Grafana][Grafana]][Grafana-url][![Prometheus][Prometheus]][Prometheus-url][![Jest][Jest]][Jest-url][![Vite][Vite]][Vite-url][![HTML5][HTML5]][HTML5-url][![CSS3][CSS3]][CSS3-url][![SASS][SASS]][SASS-url][![D3][D3]][D3-url][![MUI][MUI]][MUI-URL][![Git][Git]][Git-url]

</div>

Docketeer is an open source initiative comprising contributions from dozens of talented and passionate software engineers. Our application provides a simple interface to manage Docker resources & visualize both host and container metric data. Docketeer is a containerized application that can be deployed alongside your application cluster with hardly any effort. To learn more about our application and how to get started, keep reading!

### What's New in Version 18.0.0?

| Feature                                                                                                                                     | Status    |
|---------------------------------------------------------------------------------------------------------------------------------------------|-----------|
| More vulnerability info such as packages name & CVE ID with link.                                                                           | ✅        |
| Data visualization graph for each image.                                                                                                    | ✅        |
| Users can now `Rescan` to bypass Redis Caching from Version 17.0.                                                                         | ✅        |
| Ability to `Save Scan` and retrieve history scans to compare on a time series graph.                                                        | ✅        |
| **New updated UI and utilities.**                                                                                                           | ✅        |

- ✅ = Ready to use


<br />
  <div align="center">
    <p>Container Page Demo:</p>
    <img alt="Containers Page" src="assets\containerTab-new.gif" width="fit" height="auto">
    <p>Image Page Demo:</p>
    <img alt="Image Page 2" src="assets\imageTab1-new.gif" width="fit" height="auto">
    <p>Image Page Demo 2 - Pie Chart, Save & Rescan:</p>
    <img alt="Image Page 2" src="assets\imageTab2-new.gif" width="fit" height="auto">
    <p>Image Page Demo 3 - Time-series Graph:</p>
    <img alt="Image Page 2" src="assets\imageTab3-new.gif" width="fit" height="auto">
    <p>Container Metrics Page Demo:</p>
    <img alt="Container Metrics Page" src="assets\metricTab-new.gif" width="fit" height="auto">
    <p>Kubernetes Page Demo (In Development):</p>
    <img alt="Kubernates Metrics Page" src="assets\k8Tab-new.gif" width="fit" height="auto">
    <p>Other Tab Demo:</p>
    <img alt="Others gif" src="assets\hamburgerTab-new.gif" width="fit" height="auto">
  </div>
<br />


<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Features:

- Docketeer is a Docker developer tool that's available as an open-source project on GitHub or as an extension on Docker Desktop.
- It aims to simplify the development process for projects that use Docker containers.
- Visualize and compare previously saved health metric snapshots to offer users a comprehensive understanding of historical performance.
- Allows you to filter through both your running and stopped container logs.
- Provides image vulnerability data for each image for enhanced understanding of the security of used images
- Docketeer provides an easy-to-use GUI for managing Docker containers, images, and networks.
- With Docketeer, developers can quickly start, stop, and delete containers, as well as manage run Docker images.
- Docketeer offers the ability to create, delete, and attach containers to networks.
- It's a community-maintained project, with frequent updates and bug fixes.
- Docketeer is licensed under the MIT license, meaning it can be used and modified freely, even for commercial projects.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- INSTALLATION -->

## Installation
#### Open your Docker Desktop and search `Docketeer` and install the extension!

Dev & Contributors - See [DevGettingStarted](/docs/DevGettingStarted.md) & Contributing section below!

<br/>

`Notes:` If you encounter any `<dependency/package> not found by vite`: 

- Turn off the server such as 
```
# Example: stop Browser Dev environment
  make browser-down
```
- Delete everything Docketeer related - images, volumes, containers (should be deleted when you "make browser-down")

- Run Docker compose without cache using this Makefile command:
```
# Example: To build without cached image layers
  make browser-new
```

- See [Makefile](/Makefile) for more info!

<br/>

<!-- IN DEVELOPMENT -->

## In Development

| Feature                                                                                                                                     | Status    |
|---------------------------------------------------------------------------------------------------------------------------------------------|-----------|
| More advanced container configuration options within Docketeer.                                                                             | ⏳        |
| CI/CD pipeline for Docketeer repo.                                                                                                          | ⏳        |
| Improve test coverage with additional unit tests and integration tests.                                                                     | ⏳        |
| Optimize frontend rendering performance with lazy loading to reduce initial bundle size and eliminating redundant re-renders.               | ⏳        |
| Add support for more advanced Docker features, like multi-stage builds or Docker secrets, to expand the capabilities of Docketeer.          | ⏳        |
| Add the ability to control Docker containers deployed in AWS.                                                                               | ⏳        |
| Develop aggregation service to collect and cache data from prometheus data sources.                                                         | ⏳        |
| Implement endpoint scraping of any kubernetes cluster running prometheus. ([Read more](/docs/dev/features/Configuration(Alpha).md))         | ⏳        |
| Work on improving the connect/disconnnect button under networks button in Containers Tab.                                                   | ⏳        |
| Adding additional key metrics to the snapshot functionality.                                                                                | ⏳        |
| Setup a error catcher to alert Users of errors that are in the Docker Container Log.                                                        | ⏳        |
| Implement functionality that alerts users when certain metrics reach critical threshold.                                                    | ⏳        |

- ✅ = Ready to use
- ⏳ = In progress

See the [Known Issues Docs](/docs/KnownIssues.md) and [open issues](https://github.com/open-source-labs/Docketeer/issues) for a list of known issues.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- IN DEVELOPMENT -->

## Documentation
For more details, please read the ***docs*** folder, which covers the following:

- API 
- Assets
- Changelogs (V1-V18)
- Features 
  - Configuration.md
  - Models.md
- DevGettingStarted.md
- DevWorkingWithGrafana.md
- KnownIssues.md

When you are ready to launch, make sure to follow the instructions under ***Makefile***.

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repository and create a pull request. You can also simply open an issue describing your contribution.
Don't forget to give the project a star! Thanks again!

1. Fork the project and clone onto your local machine
3. Create your Feature Branch (`git checkout -b feature/NewFeatureName`)
4. Commit your Changes (`git commit -m '(feature/bugfix/style/etc.): [commit message here]'`)
5. Push to the Branch (`git push origin feature/NewFeatureName`)
6. Open a Pull Request
7. Create an issue on GitHub (as mentioned above!)

Read our [contributing guide](https://github.com/open-source-labs/Docketeer/blob/master/CONTRIBUTING.md) for more information on how to purpose bugfixes and improvements to Docketeer.

<br />

## <b>Read More</b>
- [Docketeer XVIII: A Whale of An Improvement](https://medium.com/@docketeerxii/announcing-docketeer-18-0-a-whale-of-an-improvement-67282fbbbe61)
- [Docketeer XVII: Transforming with Security](https://medium.com/@docketeerxii/docketeer-xvii-transforming-with-security-45cd06da061d)
- [Docketeer XVI: The Journey Continues](https://medium.com/@docketeerxii/introducing-docketeer-xvi-the-journey-continues-f34fc5bf7749)
- [Docketeer XV: Naviating the Seas of Docker with Docketeer v15](https://medium.com/@christiandoescoding/navigating-the-seas-of-docker-with-docketeer-v15-0-ad5bd9540d14)
- [Docketeer XIV: Coming Home](https://medium.com/@grantschussler/docketeer-xiv-coming-home-6eb011990a34)
- [Docketeer XIII: A Tool for Docker!](https://medium.com/@michael_kwon_liu/docketeer-a-tool-for-docker-273793014eb0)
- [Docketeer XII: Now Ready for Launch!](https://medium.com/@jaenixlee/docketeer-xii-now-ready-for-launch-d06e8f26cd0f)
- [Introducing Docketeer XI | The Latest Version Ready for Takeoff with a Splash!](https://medium.com/@saadh123/introducing-docketeer-xi-the-latest-version-ready-for-takeoff-with-a-splash-d5f40eacb29d)
- [Enjoy the sleek new look of Docketeer X](https://medium.com/@ajschmidt225/enjoy-the-sleek-new-look-of-docketeer-x-34c1ccf8bb2b)
- [Docketeer is here to make a splash!](https://medium.com/@garima41/docketeer-9-0-is-here-to-make-a-splash-134336923d3d)
- [Docketeer is here! You’re WHALEcome!](https://medium.com/@dfeldman24/docketeer-5-0-is-here-youre-whalecome-6f9d72ec3b58)
- [Docketeer! What's new?](https://medium.com/@hultzentre/docketeer-5-0-whats-new-358a5f107ac4)
- [Docketeer: An Innovative Tool to Manage Docker Containers](https://griffinsilver.medium.com/docketeer-3-0-an-innovative-tool-to-manage-docker-containers-723ea5be6220a)
- [Whale Hello There, Docketeer 4.0 is Here!](https://msscloudy.medium.com/whale-hello-there-docketeer-4-0-is-here-b78bd9d1df01)
- [Our Journey Building Docketeer](https://betterprogramming.pub/our-journey-building-docketeer-an-open-source-docker-container-monitoring-and-visualization-tool-fb6c26d8908a)

<br />

<!-- LICENSE -->

## License

Distributed under the MIT License. See [License](/LICENSE) for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Show Your Support

Please ⭐️ this project if you found it helpful, thank you!
<br />

## Contributors
- Quan Nguyen [@ZinWR](https://github.com/ZinWR) | [Linkedin](https://www.linkedin.com/in/quan-nguyen27/)
- Alexander David [@alexjosephdavid](https://github.com/alexjosephdavid) | [Linkedin](https://www.linkedin.com/in/alexander-joseph-david)
- Andy White [@ComfyClicks](https://github.com/ComfyClicks) | [Linkedin](https://www.linkedin.com/in/andywhite5)
- Nick Kravchuk [@kravchuknick](https://github.com/kravchuknick) | [Linkedin](https://www.linkedin.com/in/nickkravchuk/)
- Chelsea Lau [@chelsea01688](https://github.com/chelsea01688) | [Linkedin](https://www.linkedin.com/in/chelsea-wklau/)
- Giovanni Morales Cortes [@GiovanniCortes19](https://github.com/GiovanniCortes19) | [Linkedin](https://www.linkedin.com/in/giovanni-cortes/)
- Jade Chan [@JadeChan03](https://github.com/JadeChan03) | [Linkedin](https://www.linkedin.com/in/jade-melissa-chan/)
- Jessica Grant [@jessicarobyn10](https://github.com/jessicarobyn10) | [Linkedin](https://www.linkedin.com/in/jessicargrant/)
- Robin Zhang [@yuchen-z](https://github.com/yuchen-z) | [Linkedin](www.linkedin.com/in/yuchen-robin-zhang)
- Dan Lin [@DanLin91](https://github.com/DanLin91) | [Linkedin](https://www.linkedin.com/in/danlin91/)
- Kadir Gundogdu [@kadirgund](https://github.com/kadirgund) | [Linkedin](https://www.linkedin.com/in/kadirgund/)
- Minchan Jun [@MinchanJun](https://github.com/MinchanJun) | [Linkedin](https://www.linkedin.com/in/minchan-jun/)
- Wilmer Sinchi [@sinchiw](https://github.com/sinchiw) | [Linkedin](https://www.linkedin.com/in/wilmer-sinchi-143b7681/)
- Richie Edwards [@richie-edwards](https://github.com/richie-edwards) | [Linkedin](https://www.linkedin.com/in/richieedwards/)
- Mitesh Patel [@mit1812](https://github.com/mit1812) | [Linkedin](https://www.linkedin.com/in/mitesh-patel-8702728b/)
- Matt Jones [@mc-jones](https://github.com/mc-jones) | [Linkedin](https://www.linkedin.com/in/mc-jones/)
- Chai Lee [@seachai](https://github.com/seachai) | [Linkedin](https://www.linkedin.com/in/chai-lee-5a064649/)
- Anton Abdukhamidov [@abdukhamidov-anton](https://github.com/abdukhamidov-anton) | [Linkedin](https://www.linkedin.com/in/anton-abdukhamidov-1163733b/)
- Alex Smith [@ajsmith925](https://github.com/ajsmith925) | [Linkedin](https://www.linkedin.com/in/ajsmith925/)
- Catherine Larcheveque [@clarcheveque](https://github.com/clarcheveque) | [Linkedin](https://www.linkedin.com/in/clarcheveque/)
- Charles Ryu [@charcharryu](https://github.com/charcharryu) | [Linkedin](https://www.linkedin.com/in/charcharryu/)
- Griffin Silver [@griffinrogersilver](https://github.com/griffinrogersilver) | [Linkedin](https://www.linkedin.com/in/griffin-silver-1ab675140/)
- Lorenzo Guevara [@lo-guevara](https://github.com/lo-guevara) | [Linkedin](https://www.linkedin.com/in/lorenzoguevara/)
- May Li [@msscloudy](https://github.com/msscloudy) | [Linkedin](https://www.linkedin.com/in/maysli)
- Ricardo Cortez [@rcortez88](https://github.com/rcortez88) | [Linkedin](https://www.linkedin.com/in/rcortez88/)
- Emma Czech [@emczech](https://github.com/emczech) | [Linkedin](https://www.linkedin.com/in/emczech/)
- Brent Speight [@brentspeight](https://github.com/brentspeight) | [Linkedin](https://www.linkedin.com/in/brent-speight/)
- Eric Lee [@errc-lee](https://github.com/errc-lee) | [Linkedin](https://www.linkedin.com/in/errc-lee/)
- Kristine Aguda [@kaguda](https://github.com/kaguda) | [Linkedin](https://www.linkedin.com/in/kristine-aguda/)
- Dylan Feldman [@dfeldman24](https://github.com/dfeldman24) | [Linkedin](https://www.linkedin.com/in/dylan-feldman)
- Tre Hultzen [@THultz](https://github.com/THultz) | [Linkedin](https://www.linkedin.com/in/tre-hultzen/)
- Kenneth Hui [@kennethhui121](https://github.com/kennethhui121) | [Linkedin](https://www.linkedin.com/in/kenneth-hui/)
- Eric Lay [@ericlay14](https://github.com/ericlay14) | [Linkedin](https://www.linkedin.com/in/ericlay14/)
- Austin Andrews [@austinandrews](https://github.com/austinandrews) | [Linkedin](https://www.linkedin.com/in/austinandrews17/)
- Fernando Luna [@lunaf-github](https://github.com/lunaf-github) | [Linkedin](https://www.linkedin.com/in/fernando-luna)
- Christina Son [@cson17](https://github.com/cson17) | [Linkedin](https://www.linkedin.com/in/christinason17/)
- Christian Looff [@cmlooff](https://github.com/cmlooff) | [LinkedIn](https://www.linkedin.com/in/christian-looff/)
- Reuel Warner-Rosen [@Ruliwr](https://github.com/Ruliwr) | [Linkedin](https://www.linkedin.com/in/Ruliwr/)
- Trine Medina [@TrineMedina](https://github.com/TrineMedina) | [Linkedin](https://www.linkedin.com/in/trinemedina/)
- Matt Dias [@Schmang13](https://github.com/Schmang13) | [Linkedin](https://www.linkedin.com/in/matthew-j-dias/)
- Abigail Gerig [@4estgirl](https://github.com/4estgirl) | [Linkedin](https://www.linkedin.com/in/abigail-gerig/)
- Jack Yuan [@jackyuan1](https://github.com/jackyuan1) | [LinkedIn](https://www.linkedin.com/in/jack-yuan-298244247/)
- Sarah Moosa [@Sbethm](https://github.com/Sbethm) | [LinkedIn](https://www.linkedin.com/in/sarah-moosa-4b05721b6/)
- Cedar Cooper [@CedarCooper](https://github.com/CedarCooper) | [LinkedIn](https://www.linkedin.com/in/cedar-cooper/)
- Tiffany Chau [@tiffanynchau](https://github.com/tiffanynchau/) | [LinkedIn](https://www.linkedin.com/in/tiffanynchau/)
- Drew Manley [@DrewManley](https://github.com/DrewManley) | [LinkedIn](https://www.linkedin.com/in/andrewmanley13/)
- Eshaan Joshi [@eshaan32](https://github.com/eshaan32) | [LinkedIn](https://www.linkedin.com/in/eshaanjoshi/)
- Garima Bhatia [@GarimaB06](https://github.com/GarimaB06) | [LinkedIn](https://www.linkedin.com/in/garimab06/)
- Nathan Cho [@nathanycho](https://github.com/nathanycho) | [LinkedIn](https://www.linkedin.com/in/nathanycho/)
- Jonathan Wong [@WongJonathann](https://github.com/WongJonathann) | [LinkedIn](https://www.linkedin.com/in/jon-wong-00/)
- Dillon H. Patel [@d-hp](https://github.com/d-hp)
- Alex Schmidt [@RedAfronNinja](https://github.com/RedAfronNinja) | [LinkedIn](https://www.linkedin.com/in/alex-schmidt-44b27413b/)
- Edward Kenny [@EdwardKenny](https://github.com/EdwardKenny) | [LinkedIn](https://www.linkedin.com/in/edward-kenny-8949b8136/)
- Kennan Budnik [@kobudnik](https://github.com/kobudnik) | [LinkedIn](https://www.linkedin.com/in/kobudnik/)
- Mason Royal [@masonroyal](https://github.com/masonroyal) | [LinkedIn](https://www.linkedin.com/in/masonroyal/)
- Benjamin Huang [@byhuang4100](https://github.com/byhuang4100) | [LinkedIn](https://www.linkedin.com/in/bh4120/)
- Saad Hamdani [@Saadh123](https://github.com/saadh123) | [LinkedIn](https://www.linkedin.com/in/saadh123/)
- Michael Angelo Garcia [@MichaelAngelo13](https://github.com/MichaelAngelo13) | [LinkedIn](https://www.linkedin.com/in/michael-angelo-garcia-053848265/)
- Anna Tran [@annamullike](https://github.com/annamullike) | [LinkedIn](https://www.linkedin.com/in/annatran10/)
- Emily John [@emilyjohl](https://github.com/emilyjohl) | [LinkedIn](https://www.linkedin.com/in/emily-johl-5093ab137/)
- Jaeni Lee [@jaenixlee](https://github.com/jaenixlee) | [LinkedIn](https://www.linkedin.com/in/jaenilee/)
- Joseph Salgado [@Jaysalgado](https://github.com/Jaysalgado) | [LinkedIn](https://www.linkedin.com/in/joseph-salgado-76410620b/)
- Michael (Kwon) Liu [@KwonJiyongGD](https://github.com/KwonJiyongGD) | [LinkedIn](https://www.linkedin.com/in/michael-kwon-liu/)
- Garrett Allen [@garrettallen0](https://github.com/garrettallen0) | [LinkedIn](https://www.linkedin.com/in/garrettallen0/)
- Adrian Kormier [@adriankormier](https://github.com/adriankormier) | [LinkedIn](https://www.linkedin.com/in/adrian-kormier/)
- Shuai Shao [@shao-shuai](https://github.com/shao-shuai) | [LinkedIn](http://www.linkedin.com/in/shuai-sh/)
- John Kim [@jayoo0621](https://github.com/jayoo0621) | [LinkedIn](https://www.linkedin.com/in/jayoo0621/)
- Tristan Keester [@ronagens](https://github.com/ronagens) | [LinkedIn](https://www.linkedin.com/in/tristan-keester/)
- Tristan Krause [@tristanyuukio](https://github.com/tristanyukio) | [LinkedIn](https://www.linkedin.com/in/krausetristan)
- Grant Schussler [@gschussler](https://github.com/gschussler) | [LinkedIn](https://www.linkedin.com/in/grant-schussler/)
- Jacob Melendez [@JacobAMelendez](https://github.com/JacobAMelendez) | [LinkedIn](https://www.linkedin.com/in/jacob-melendez-72245278)
- Jonathan Gray [@thejohnny5](https://github.com/thejohnny5) | [LinkedIn](https://www.linkedin.com/in/jonathan-gray-987169183/)
- Cristian Morales [@Cris-Morales](https://github.com/Cris-Morales) | [LinkedIn](https://www.linkedin.com/in/cmorales-uxr274/)
- Josh Nelson [@JoshNelson98](https://github.com/JoshNelson98) | [LinkedIn](https://www.linkedin.com/in/josh-nelson-7aba19284/)
- Alicia Zhang [@AliciaZ429](https://github.com/AliciaZ429) | [LinkedIn](https://www.linkedin.com/in/alicia-zhang-a1aaa2138/ )
- Wei Cheng Wang [@weiwang0305](https://github.com/weiwang0305) | [LinkedIn](https://www.linkedin.com/in/wei-cheng-wang-2a92b4120/)
- Gabriela Pleitez Gomez [@gabyspg](https://github.com/gabyspg) | [LinkedIn](https://www.linkedin.com/in/gabriela-pleitez-gomez)
- Peter Chung [@peterchung](https://github.com/peterchung) | [LinkedIn](https://www.linkedin.com/in/peterminkichung/)


<p align="right">(<a href="#readme-top">back to top</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/open-source-labs/Docketeer.svg?style=for-the-badge
[contributors-url]: https://github.com/open-source-labs/Docketeer/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/open-source-labs/Docketeer.svg?style=for-the-badge
[forks-url]: https://github.com/open-source-labs/Docketeer/network/members
[stars-shield]: https://img.shields.io/github/stars/open-source-labs/Docketeer.svg?style=for-the-badge
[stars-url]: https://github.com/open-source-labs/Docketeer/stargazers
[issues-shield]: https://img.shields.io/github/issues/open-source-labs/Docketeer.svg?style=for-the-badge
[issues-url]: https://github.com/open-source-labs/Docketeer/issues
[license-shield]: https://img.shields.io/github/license/open-source-labs/Docketeer.svg?style=for-the-badge
[license-url]: https://github.com/open-source-labs/Docketeer/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/company/docketeer
[product-screenshot]: images/screenshot.png
[React.js]: https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[React-url]: https://reactjs.org/
[TS.js]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[TS-url]: https://www.typescriptlang.org/
[Grafana]: https://img.shields.io/badge/grafana-%23F46800.svg?style=for-the-badge&logo=grafana&logoColor=white
[Grafana-url]: https://grafana.com/
[Prometheus]: https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=Prometheus&logoColor=white
[Prometheus-url]: https://prometheus.io/
[JavaScript]: https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E
[JavaScript-url]: https://www.javascript.com/
[Node.js]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/en/
[Vite]: https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev/
[Express]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[Express-url]: https://expressjs.com/
[Redis]: https://img.shields.io/badge/redis-%23DD0031.svg?&style=for-the-badge&logo=redis&logoColor=white
[Redis-url]: https://redis.com/
[MongoDB]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com
[Redux]: https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white
[Redux-url]: https://redux.js.org/
[Postgres]: https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white
[Postgres-url]: https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white](https://www.postgresql.org/)
[Jest]: https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white
[Jest-url]: https://jestjs.io/
[Styled Components]: https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white
[Styled Components-url]: https://styled-components.com/
[Docker]: https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/
[Git]: https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white
[Git-url]: https://git-scm.com/
[CSS3]: https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white
[CSS3-url]: https://www.w3schools.com/css/
[HTML5]: https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white
[HTML5-url]: https://www.w3schools.com/html/
[MySQL]: https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white
[MySQL-url]: https://www.mysql.com/
[SASS]: https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white
[SASS-url]: https://sass-lang.com/
[RTK]: https://img.shields.io/badge/RTK-563D7C?style=for-the-badge&logo=redux&logoColor=white
[RTK-url]: https://redux-toolkit.js.org/
[Helm]: https://img.shields.io/badge/helm-navy?style=for-the-badge&logo=helm&logoColor=white
[Helm-url]: https://helm.sh/
[Kubernetes]: https://img.shields.io/badge/kubernetes-3371e3?style=for-the-badge&logo=kubernetes&logoColor=white
[Kubernetes-url]: https://kubernetes.io/
[D3]: https://img.shields.io/badge/d3-red?style=for-the-badge&logo=d3.js
[D3-url]: https://d3js.org/
[MUI]:https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white
[MUI-url]: https://mui.com/
