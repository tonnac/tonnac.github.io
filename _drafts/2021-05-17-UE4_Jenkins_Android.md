---
title: "[UE4] Jenkins 안드로이드 빌드"
toc: true
toc_sticky: true
categories:
  - Project
  - UE4
  - CI
tags:
  - Jenkins

J: "Jenkins"
---

인터넷 돌아다니다가 빌드 자동화에 대해 알게되고 {{page.J}}를 통해 언리얼엔진 프로젝트에 적용해 본 내용을 정리함

# 1. {{page.J}} 설치

[{{page.J}} 다운로드 페이지](https://www.jenkins.io/download/)  
설치에 딱히 어려움은 없음.  
추가적으로 {{page.J}}는 JRE 설치가 필요하다.  
[Java 다운로드 페이지](https://java.com/ko/download/ie_manual.jsp?locale=ko)

# 2. 환경설정

![](https://tonnac.github.io/assets/images/J0.png)<br>
초기화면  
{{page.J}}는 현재 사용중인 브라우저 언어에 따라서 설정이되는데, 한글같은 경우는 번역체가 좀 있어서 그냥 영어를 쓰는게 편한듯

## 1) 노드추가

Manage Jenkins -> Manage Nodes and Clouds -> New Node로 추가해준다.  
노드에 환경 변수를 추가해준다. ARCHIVE_ROOT는 빌드가 진행한 후 결과물을 압축해서 올릴 수 있는데 필요없다면 패스.
ENGINE_ROOT에 쓸 엔진을 추가해준다.  
![](https://tonnac.github.io/assets/images/J1.png)<br>

# 3. 프로젝트 추가

NewItem -> Freestyle project로 새로운 프로젝트를 생성한다.

## 1) General

![](https://tonnac.github.io/assets/images/J2.png)<br>

### 1 This Project is parameterized (선택)

파라미터를 통해 다양하게 빌드를 진행할 수 있다.  
위와같이 솔루션구성을 다르게 한다던가 플랫폼을 변경해서 빌드를 하는 등으로 사용할 수 있다.

### 2 Restrict where this project can be run

앞서 만들었던 노드의 이름을 넣어준다.

### 3 User custom workspace

프로젝트 폴더를 넣어준다.

## 2) Source Code Management

자신이 사용하고 있는 소스컨트롤을 선택하고 Repository를 설정

## 3) Build Triggers

빌드가 될 시점을 선택한다.  
현재 테스트해본것은 Poll SCM으로 H/2 \* \* \* \* 값을 넣어줘서 2분마다 Repository를 확인해서 변경 사항이 있으면 빌드를 진행하는 방식이다.

## 4) Build

빌드 명령을 설정해주는 부분.

Add build step에서 Execute Windows batch command를 선택해서 추가해준다.

### 1 temp, Binaries, Intermediate 폴더 삭제

```sh
rd /s /q temp
rmdir /s /q "%WORKSPACE%\Binaries"
rmdir /s /q "%WORKSPACE%\Intermediate"
```

빌드한 파일들은 temp폴더에 저장했다가 빌드가 완료되면 폴더이름을 바꿔주어서 temp 폴더를 넣어준다.

### 2 UnrealBuildTool을 이용해서 uproject파일에서 sln파일 생성

```sh
"%ENGINE_ROOT%\Engine\Binaries\DotNET\UnrealBuildTool.exe" -projectfiles -project="%WORKSPACE%\%PROJECT_NAME%.uproject" -game -rocket -progress
```

### 3 Msbuild로 프로젝트 컴파일

```sh
"C:\Program Files (x86)\Microsoft Visual Studio\2019\Community\MSBuild\Current\Bin\MSBuild.exe" "%WORKSPACE%\%PROJECT_NAME%.sln" /t:build /p:Configuration="%BUILD_CONFIGURATION%";Platform=Win64;verbosity=diagnostic
```

MSBuild 파일 경로는 사용하는 컴퓨터 환경에서 찾아서 넣어주면 된다.

### 4 temp폴더 없으면 생성

```sh
if not exist "%WORKSPACE%/temp/x64" mkdir "%WORKSPACE%/temp/x64"
```

### 5 패키징 진행

```sh
"%ENGINE_ROOT%\Engine\Build\BatchFiles\RunUAT.bat" BuildCookRun -project="%WORKSPACE%\%PROJECT_NAME%.uproject" -noP4 -platform=Win64 -clientconfig=%BUILD_CONFIGURATION% -cook -allmaps -build -stage %USE_PAK% -archive -archivedirectory="%WORKSPACE%/temp/x64"
```

### 6 Temp폴더 이름 변경

```sh
ren %WORKSPACE%\temp\x64\WindowsNoEditor %PROJECT_NAME%_%BUILD_CONFIGURATION%_x64
```

### 7 완료한 빌드폴더 압축하기(선택)

```sh
"%ARCHIVE_ROOT%/7z.exe" a -t7z %WORKSPACE%/temp/x64/%PROJECT_NAME%_%BUILD_CONFIGURATION%_x64/%PROJECT_NAME%_%BUILD_CONFIGURATION%_x64.7z "%WORKSPACE%\temp\x64\%PROJECT_NAME%_%BUILD_CONFIGURATION%_x64"
```

## 5) Post-build Actions

빌드가 끝나고 나서 할것들을 정할 수 있다.  
슬랙에 알람, 이메일 전송, {{page.J}}에 압축한 파일 올리기 등등이 가능.

# TODO

현재 테스트 환경은 로컬에서 진행한것이라 추후에 서버컴퓨터에서 작동을 시켜보기  
안드로이드로 빌드를하면 중간에 에러가 나서 이 부분을 어떻게 해야할지 생각해보기

# 참고

[https://www.cairansteverink.nl/cairansteverink/blog/unreal-engine-4-build-automation-with-jenkins-and-perforce/](https://www.cairansteverink.nl/cairansteverink/blog/unreal-engine-4-build-automation-with-jenkins-and-perforce/)
[https://patricevignola.com/post/automation-jenkins-unreal](https://patricevignola.com/post/automation-jenkins-unreal)
[https://github.com/skymapgames/jenkins-ue4](https://github.com/skymapgames/jenkins-ue4)
