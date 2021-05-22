---
title: "[UE4] Jenkins 스크립트로 빌드 진행"
toc: true
toc_sticky: true
categories:
  - Project
  - UE4
  - CI
tags:
  - Jenkins

J: "Jenkins"
P: "Pipeline Script"
---

# 1. {{page.P}}

언리얼 젠킨스 관련 깃허브 뒤지던 중 파이프라인을 스크립트로 짜서 빌드를 진행할 수 있는걸 보고 해보기로 했다. <br>
스크립트는 Declarative Pipeline 방식과 Scripted Pipeline 방식 두가지가 있는데 문서를 자세히 안봐서 뭔 차이인지는 모르겠다.<br>
[UE4JenkinsLibrary](https://github.com/jackknobel/UE4JenkinsLibrary) 여기서 본 코드가 맘에들어서 이걸 라이브러르로 사용하기로 했다.<br>
{{page.J}}에서 Pipeline으로 New Item을 만들어서 Pipeline 항목에다 작성을 하면 되는데 그냥 작성을 할수도 있고 SCM에 올린 파일을 불러와서 사용하게 할 수도 있다. <br>
나는 깃허브에 올려놓고 사용을 해봤는데 바뀌는 스크립트 코드를 확인 가능해서 좋았다.<br>
SCM를 통해서 사용할때는 Jenkinsfile을만들고 스크립트 내용을 그 안에 작성하면 된다.<br>

# 2. 공유 라이브러리

공유 라이브러리로 등록하기 위해선 {{page.J}}에서 Manage Jenkins -> Configure System -> Global Pipeline Libraries에 등록을 해주면 된다 <br>
라이브러리 이름을 넣어주고 Pipeline Script 작성과 마찬가지로 SCM을 통해 불러오도록 리포지토리 주소를 넣어주면 된다.
![](https://tonnac.github.io/assets/images/Jenkins_Script_00.png)<br>
{{page.P}}에서 사용할때는 @Library('라이브러리 이름@브랜치이름')를 코드 상단에 넣어주면 된다.

# 3. 빌드 과정

앞에 포스트에서 진행한 빌드는 플랫폼이 윈도우일 경우 실행이 되지만 안드로이드일 경우에는 안됐었는데, 이 부분을 해결하려고 언리얼 문서를 보다가 엔진을 컴파일을 하면 빌드 과정을 디버깅해서 볼 수 있다는걸 알고 확인해 보기로했다.<br> 엔진 솔루션에서 Programs에 있는 AutomationToolLauncher인데 줄여서 UAT라고 불러서 사용한다. <br>
에디터 상에서 패키징 실행하면 출력창에 나오는 값들을 그대로 넣어주면 똑같이 작동하는걸 볼 수 있는데 이걸로 알게된것은 프로젝트 컴파일 단계에서 해당 플랫폼으로만 컴파일을 하는게 아니고 윈도우 버전 에디터로도 컴파일을 하는것을 확인했다.

[엔진폴더]\Engine\Build\BatchFiles\Build.bat 프로젝트이름<mark style='background-color: #dcffe4'>Editor</mark> <mark style='background-color: #dcffe4'>Win64</mark> [빌드구성] -Project=[프로젝트경로]/[프로젝트이름].uproject [프로젝트경로]/[프로젝트이름].uproject<br>
[엔진폴더]\Engine\Build\BatchFiles\Build.bat 프로젝트이름 [빌드할 플랫폼] [빌드구성] -Project=[프로젝트경로]/[프로젝트이름].uproject [프로젝트경로]/[프로젝트이름].uproject<br>

첫번째 작업은 평소에 에디터를 사용할 때 진행되는 컴파일 과정인데 CLI환경에서는 필요없지 않을까해서 생략을 했는데, 안드로이드로 빌드를할때는 중간에 프로젝트 모듈을 찾을수 없다고 뜨면서 빌드가 실패한다.<br>
UAT를 디버깅 해보니 에디터버전도 컴파일을 하는걸 확인했도 이 과정을 기존 프로젝트 컴파일 하는 과정에 선행으로 해주니 안드로이드도 빌드가 잘 진행 되었다. <br>
패키징 하던 방식도 라이브러리에 맞춰서 Cook 과 Package를 나눠서 진행하게됐다.

# 4. {{Page.J}} 안드로이드 빌드 이슈

스크립트로 바꾸고 잘 작동을 하는듯 하였으나 안드로이드를 빌드할때 문제가 생겼다. 😫<br>
PC CMD에서는 같은 코드로 정상적으로 작동을 하였으나, {{page.J}}에서 돌리면 안드로이드SDK를 못찾는 에러가 발생한다. <br>
이 문제는 윈도우 시작 -> 서비스 -> {{page.J}} -> 속성 -> 로그온에서 관리자 권한이 있는 계정으로 로그인을 하게해서 해결했다.

# 5. 결과

![](https://tonnac.github.io/assets/images/Jenkins_Script_01.png)
드디어 윈도우도 안드로이드도 잘 빌드가 됐다.<br>
한 2주동안 퇴근하고 계속 봤던거 같은데 고생만 드럽게 하다가 못하는건 아닐까 걱정했는데 잘 작동이 된걸보고 안도의 한숨을 내쉬었다. 또 언리얼 빌드과정을 조금이나마 더 알게 된점 또한 좋았다 😄😄.

# 참고

[UE4JenkinsLibrary](https://github.com/jackknobel/UE4JenkinsLibrary)<br>
[Jenkins, CI and Test-Driven Development](https://www.ue4community.wiki/jenkins-ci-amp-test-driven-development-6912tx0c)<br>
[Using a Jenkinsfile](https://www.jenkins.io/doc/book/pipeline/jenkinsfile/)<br>
[Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/)<br>
