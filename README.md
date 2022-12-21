# :computer: **BEB-06-SECOND-7ZO**

![스크린샷 2022-11-08 16-06-36](https://user-images.githubusercontent.com/108708252/200500500-15b074b5-b011-4e5b-9b35-c0193f051f0a.png)

## :one:  **Project : 7ZO**
* 팀명 : 7ZO
* 팀원 : 조은석, 김현우, 허연재, 안요한
* Date : 2022/10/27 ~ 2022/11/08

## :two: **7ZO - News Posting Commnity**

**7ZO 의 Posting Community 는 각종 뉴스를 포스팅 하여 토큰을 지급받고 NFT를 발행, 수집및 거래를 할 수 있는 커뮤니티 입니다.**

_Posting Community of 7ZO is a community where you can post various news, receive tokens, issue, collect, and trade NFTs._

**커뮤니티의 참여자들이 뉴스를 포스팅하여 필터링 되지 않은 뉴스를 이용할 수 있기 위하여 만들어졌습니다.**

_It was created to allow participants in the community to post news and access unfiltered news._

## :three: **담당, Position**

* 조은석 - FE, SC
* 김현우 - BE, SC
* 허연재 - BE, SC
* 안요한 - FE, SC

## :four: **프로젝트 소개, Project Introduce**
### :keyboard: **Tech Stack & Library**
FE - React, Redux(redux-toolkit, redux-persist) 
        Ant-Design Library, NFT.storage

BE - MySql (squelize), 
        Infura, ipfs-http-client, NFT.storage       
     -- session : OAuth(Github) + JWT  // jsonwebtoken

SC - Solidiy, Web3.js, Truffle, OpenZepplin

### :keyboard: **Flow Chart**

[Front-end]
![스크린샷 2022-11-08 17-09-14](https://user-images.githubusercontent.com/108708252/200509544-82bcc2cb-7763-4690-bffc-4ca8b4d06d03.png)

[Back-end]
![스크린샷 2022-11-08 17-08-57](https://user-images.githubusercontent.com/108708252/200509549-a5c1e950-d566-43f8-b597-a52b26db2df5.png)

### :keyboard: **WireFrame**
![image](https://user-images.githubusercontent.com/108708252/200531775-27c8232f-3760-422c-a0a2-b555878784d5.png)

### :keyboard: **실행 Installation**
**프로그램을 실행하려면 npm install 명령을 사용하여 작업에 필요한 패키지를 자동으로 설치합니다. 패키지에 대한 정보는 패키지에서 찾을 수 있습니다.**
**json 파일 .env.example 파일을 따라 서버 배포를 위한 액세스 키를 작성하고 .env로 저장합니다.**

_To run the program, use the npm install command to automatically install the packages required for the operation. Information about packages can be found in package.json file. Write access keys for server deployment along the .env.example file and save it as .env_

<pre><code>
cd server
npm install  # install packages for server
vi .env      # follow the form of .env.example
npm run start   # start server operation
</code></pre>

**서버가 정상적으로 작동하는 경우 터미널 창에서 서버가 MySql에 연결되었다는 메시지를 볼 수 있습니다.**

_If the server is operating normally, you can see the message that the server are connected to MySql in the terminal window._

<pre><code>
cd client  
npm install    # install packages for client
npm run start  # start client operation
</code></pre>

**커뮤니티 측에서 정상적으로 운영 중이면 브라우저 http://localhost:3000에서 7ZO의 메인 페이지를 볼 수 있습니다.**

_If the community side is operating normally, you can see the main page of 7ZO on the browser http://localhost:3000_

## :five: **실행화면, Execution screen**
### :mag: Home

![Peek_2022-11-08_19-25](https://user-images.githubusercontent.com/108708252/200543158-e83c71fa-d3b0-4261-a232-903a07b00397.gif)

### :mag: Post

![Peek_2022-11-08_19-29](https://user-images.githubusercontent.com/108708252/200543259-ad4d4733-330e-4e45-b344-8a63d720586c.gif)

### :mag: Sign

![Peek_2022-11-08_19-26](https://user-images.githubusercontent.com/108708252/200543389-48378c72-1e36-44bf-aad5-147c582c7ee1.gif)
![Peek_2022-11-08_19-31](https://user-images.githubusercontent.com/108708252/200543394-126aa540-7f0c-4f33-9eee-3ef8dcf63f9c.gif)

### :mag: Mypage

![mypage](https://user-images.githubusercontent.com/108708252/200514071-81790da9-ce20-4d9b-b733-954b7f2c6125.gif)

### :mag: Mint

![mint](https://user-images.githubusercontent.com/108708252/200514189-beadfd6e-0c13-4d24-a2cb-4918688336ed.gif)

### :mag: Transfer

![2022-10-20_18-31-25](https://user-images.githubusercontent.com/108708252/200514284-de9b4d56-b763-4d85-89c9-dd7ff0df5d53.png)

### :mag: Faucet
![image](https://user-images.githubusercontent.com/64346003/208817697-4f09617e-a320-416e-a310-e622ce2774cd.png)


### :mag: Daemon(Tx Logging)
![image](https://user-images.githubusercontent.com/64346003/208817720-9fbc0886-130a-412e-890e-5c31be02ca20.png)

