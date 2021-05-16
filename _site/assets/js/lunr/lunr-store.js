var store = [{
        "title": "[WinAPI] WinAPI를 이용한 모모도라 모작",
        "excerpt":"1. 게임의 개요 게임: 모모도라: 달 아래의 진혼곡 모작 인원: 개인 기간: 3주 2. 게임의 시스템 Core 와 Sample 클래스 [그림 2-1] : Core 와 Sample의 클래스 다이어그램 Core 클래스는 윈도우를 띄우는데 사용하는 Window 클래스를 상속받아 사용한다. Core의 멤버로는 Timer 클래스가 있다. Timer 클래스는 Frame()의 호출 시간을 체크하여 전에 호출된...","categories": ["Project","WinAPI"],
        "tags": ["Momodora"],
        "url": "/project/winapi/WinApi/",
        "teaser": null
      },{
        "title": "[DirectX 11] Dx11를 이용한 모모도라 모작",
        "excerpt":"1. 게임의 개요 게임: 모모도라: 달 아래의 진혼곡 모작 DirectX 11 컨버팅 인원: 개인 기간: 3주 2. 게임 시스템 Core 와 Sample 클래스 [그림 1-1] : Core 와 Sample의 클래스 다이어그램 Device는 DirectX를 사용하기 위해 기본적인 장치들을 생성하는 클래스로, 이를 윈도우를 띄우는 wClass가 상속하는 구조로 되어있다. 이를 다시 Core 클래스가...","categories": ["Project","DirectX11"],
        "tags": ["Momodora"],
        "url": "/project/directx11/DxMomo/",
        "teaser": null
      },{
        "title": "[UE4] UE4를 이용한 WoW모작",
        "excerpt":"1. 게임의 개요 게임: WoW 모작 인원: 개인 기간: 3주 엔진버전: 4.21 C++ 70%, 블루프린트 30%로 작업 2. 개발내용 캐릭터 애니매이션 블루프린트 구현 Behaviour Tree를 통해 AI 행동구현 캐릭터 레벨, 1차 스탯(힘, 민첩, 지능, 체력) 2차 스탯(가속, 치명타), 버프 구현 주문 시스템 구현 [그림 2-1] 주문은 데이터에셋을 통해서 관리 Post-Processing을...","categories": ["Project","UE4"],
        "tags": ["Wow"],
        "url": "/project/ue4/UE4.Wow/",
        "teaser": null
      },{
        "title": "[Modern Effective C++] 1. 템플릿 타입 추론 규칙을 숙지",
        "excerpt":"template &lt;typename T&gt; void f(ParamType param); f(expr); 위와같은 템플릿 함수를 호출할때 컴파일러는 expr을 이용해 T 와 ParamType을 추론한다. T에대해 추론된 형식은 항상 expr의 형식이 되지 않는다. expr의 형식외에도 ParamType의 형태에도 의존하기 때문. ParamType형태에 따라 세 가지 경우로 나뉜다. ParamType이 포인터 또는 참조 형식이지만 Universal Reference는 아닌 경우 ParamType이 Universal Reference인...","categories": ["Book"],
        "tags": ["Modern Effective C++","C++","Modern C++","Type Deduction"],
        "url": "/book/01/",
        "teaser": null
      },{
        "title": "[Modern Effective C++] 2. auto의 타입 추론 규칙을 숙지",
        "excerpt":"auto 추론 방식 auto의 타입추론은 [1. 템플릿 타입 추론 규칙을 숙지]에서와 같이 템플릿 타입 추론과 거의 같다. template &lt;typename T&gt; void f(ParamType param); auto에서 타입 추론이 이뤄질 때, auto는 템플릿의 T와 동일한 역할을 하며, 변수의 형식 지정자(type specifier)는 ParamType과 동일한 역할을 한다. auto x = 27; const auto cx =...","categories": ["Book"],
        "tags": ["Modern Effective C++","C++","Modern C++","Type Deduction"],
        "url": "/book/02/",
        "teaser": null
      },{
        "title": "[UE4] Jenkins를 이용한 CI환경 구축",
        "excerpt":"인터넷 돌아다니다가 빌드 자동화에 대해 알게되고 Jenkins를 통해 언리얼엔진 프로젝트에 적용해 본 내용을 정리함 1. Jenkins 설치 Jenkins 다운로드 페이지 설치에 딱히 어려움은 없음. 추가적으로 Jenkins는 JRE 설치가 필요하다. Java 다운로드 페이지 2. 환경설정 초기화면 Jenkins는 현재 사용중인 브라우저 언어에 따라서 설정이되는데, 한글같은 경우는 번역체가 좀 있어서 그냥 영어를 쓰는게...","categories": ["Project","UE4","CI"],
        "tags": ["Jenkins"],
        "url": "/project/ue4/ci/UE4_Jenkins/",
        "teaser": null
      }]
