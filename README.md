# Style Finder



## 개발 환경

### Front-end

- Visual Studio Code
- React 18.2.0
- Node.js 20.10.0
- TypeScript
- Tailwind CSS

### Back-end

- IntelliJ
- spring boot 3.2.1
- spring-boot-jpa
- spring security 6.1.3
- OpenJDK 17
- MySQL 8.3.0

### Infra

Docker
Jenkins 2.426.2
AWS EC2
AWS S3
Server 20.04.6 LTS (GNU/Linux 5.15.0-1051-aws x86_64)
Nginx 1.24.0

### BigData

Hadoop
Spark

### 협업툴

- Git
- Jira
- Notion
- Mattermost
- Figma


💥기술 특이점

- ...

💥 실행
- 프로젝트 클론 
  ```
  // 원격 저장소 로컬 저장
  git clone {Github 주소}

  // 폴더 이동
  cd S10P12D204
  ```
- 프론트 로컬 실행
  ```
  // 폴더 이동
  cd front-end

  // node.js 설치
  npm install

  // 로컬 프론트 실행
  npm run dev 
  ```
- 백엔드 로컬 실행
  ```
  // 폴더 이동
  cd backend
  
  // 프로젝트 빌드
  ./gradlew clean build

  // 프로젝트 실행
  java


### ⚡️ Git 컨벤션
⚡️제목
- 🚧 : 작업 도중 저장
- ✨ : 기능 구현
- 🎨 : 파일 구조 수정
- 🚑️ : 버그 수정
- 🧱 : 인프라 관련 작업
- 🔨 : 코드 리팩토링
- 🔧 : 포트, 환경, 세팅에 관한 수정

<br>

⚡️꼬리말
- Fixes : 이슈 수정 중 (미해결)
- Resolves : 이슈 해결 후
- Ref : 참고할 이슈
- Related to : 해당 커밋과 관련된 이슈 번호(미해결)

<br>

⚡️commit message 예시
```
✨: "추가 로그인 함수"  // 제목

로그인 API 개발          // 본문

Resolves: #123          // 꼬리말 
Ref: #456
Related to: #48, #45

issue_key               // jira 연동
issue_key #done         // jira 해당 작업 완료
```

<br>


### ⚡️ Git Flow
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
  backend/domain/feature
  frontend/domain/feature

  예시 : be/user/login
  ```



# 추가할 내용

- ERD
- 시스템 아키텍처
- 피그마 화면 설계도

### 👨‍👩‍👧 팀원 역할

### 🎨 EC2 포트 정리
| 이름 | 내부 포트 | 외부 포트 |
| :-----: | :-----: | :-----: |
| Vue | 3000 | 3000 |
| SpringBoot | 8081 | 8081 |
| Jenkins | 9090 | 9090 |
| MySQL | 3306 | 3306 |
| http | 80 | ----- |
| https | 443 | ----- |
