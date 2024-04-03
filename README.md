# Style Finder

## 서비스 소개

## 개발 환경

### Front-end

- Visual Studio Code
- React 18.2.0
- Node.js 20.10.0
- TypeScript
- Tailwind CSS

### Back-end

- IntelliJ
- SpringBoot 3.2.1
- spring-boot-jpa
- spring security 6.1.3
- OpenJDK 17
- MySQL 8.3.0
- MongoDB 7.0.7
- Redis

### AI

- PyCharm
- MobaXterm
- python 3.10.0
- FastAPI 0.110.0
- uvicorn 0.29.0
- Pytorch 2.2.1

### Data

- VSCode
- MobaXterm
- python 3.8.10
- java 11.0.22
- FastAPI 0.110.0
- uvicorn 0.29.0
- hadoop 3.3.6
- pyspark 3.5.1

### Infra

- MobaXterm
- Docker
- Jenkins 2.426.2
- AWS EC2
- AWS S3
- Server 20.04.6 LTS (GNU/Linux 5.15.0-1051-aws x86_64)
- Nginx 1.24.0

### 협업 툴

- Git
- Jira
- Notion
- Mattermost
- Figma

## 기술 특이점

<br>

### Git Flow 전략

- Git flow 사용한 브랜치
  - master : 배포
  - develop : 개발 및 테스트
  - feature : 기능

<br>

- Git flow 사용한 브랜치
  - 개발 시, 맡은 기능 별로 develop 하위에 feature 브랜치 생성
  - 개발 완료 시, 해당 feature 브랜치를 develop에 merge한다.
  - 개발 테스트 시, develop에 파이프라인 연결하여 배포 및 테스트 작업 진행
  - 개발 완료 및 테스트 완료 시, master 브랜치로 배포 진행

<br>

- Git 브랜치 이름 컨벤션

```
FE/domain/feature
BE/domain/feature
```

## ERD 설계도

<img src="./README/ERD.png" />

## 화면 설계도

### 코디 페이지

<img src="./README/CoordiPage.png" />

### 피드 페이지

<img src="./README/FeedPage.png" />

### 분석 페이지

<img src="./README/AnalysisPage.png" />

## 시스템 아키텍처

- 시스템 아키텍처

### 👨‍👩‍👧 팀원 역할

### 김치욱

### 정은진

### 오승현

### 김준수

- 팀장이용
### 정수빈

<br/>

## 🎨 EC2 포트 정리

### EC2 (React + SpringBoot + FastAPI + DB)

|    이름    | 내부 포트 | 외부 포트 |
| :--------: | :-------: | :-------: |
|   React    |   3000    |   3000    |
| SpringBoot |   8081    |   8081    |
|  FastAPI   |   8000    |   8000    |
|  Jenkins   |   9090    |   9090    |
|   MySQL    |   3306    |   3306    |
|   Redis    |   6379    |   6379    |
|  MongoDB   |   27017   |   27017   |

<br/>

### EC2 (Hadoop FastAPI)

|  이름   | 내부 포트 | 외부 포트 |
| :-----: | :-------: | :-------: |
| FastAPI |   8000    |   8000    |
