<img align="left" width="120px" src="https://user-images.githubusercontent.com/75469131/217808445-3c46e1a6-9fc5-43da-b417-eae4adb56a4b.png" />

# Eat Da (잇다)

*따뜻한 식탁에 건강 한 스푼, EatDa (잇다) 🥗*

> 당뇨 식단 관리, <br/>
혼자 하기 버겁지 않았나요? <br/>
잇다는 가족들의 관심과 조력의 힘을 믿습니다. <br/> <br/>
잇다는 가족과 함께하는 당뇨병 식단관리 플랫폼입니다. <br/>
당뇨인의 체질과 선호에 맞는 맞춤형 식단 추천부터 가족과 함께 선호를 공유하는 기능까지! <br/>
잇다는 당뇨인의 건강한 식생활과 함께하겠습니다.

<br/>

[🚀 EatDa 앱 설치하러 가기 🚀](https://suave-lilac-075.notion.site/Eatda-App-8504c23f293f488db826ff340ba978de)

<br/>

<img height="300px" align="right" src="https://user-images.githubusercontent.com/75469131/217815690-1db07daa-3825-439d-8c96-85aec169bbdc.png"/>
<img height="300px" src="https://user-images.githubusercontent.com/75469131/217818750-4e241ace-954d-40dd-9297-a745f8a653c9.png" />

<br/>

## 🤼‍♂️ Team
| Plan | Design | FrontEnd | BackEnd |
|:-:|:-:|:-:|:-:|
| 정경윤 | 이소희 | [seondal](https://github.com/seondal) | [heesoooo](https://github.com/heeeesoo) |
| 서의현 | 최수빈 | [bsa0322](https://github.com/bsa0322) | [jianny-lee](https://github.com/jianny-lee) |

<br />

## 👩🏻‍💻 FE Role
|[seondal](https://github.com/eatda/eatda-fe/pulls?q=is%3Apr+is%3Aclosed+author%3Aseondal)|[heesoooo](https://github.com/eatda/eatda-fe/pulls?q=is%3Apr+is%3Aclosed+author%3Aheeeesoo)|
|---|---|
| 메인페이지<br/>필터페이지<br/>레시피 상세정보 페이지<br/>레시피 조리 시작 페이지<br/>서재탭 식후 혈당 기록하기<br/>서재탭 주간레포트 | 마이페이지<br/>주방탭 추천식사<br/>주방탭 Our Pick!<br/>로그인 / 온보딩 / 스플래시<br/>회원가입 / 당뇨인<br/>회원가입 가족공간 입장 / 생성 |

<br/>

## 📚 Stack
- **Typescript** 기반
- **NextJS**를 이용한 Server Side Rendering 
- **Redux**를 이용한 전역 상태관리 (유저 및 필터 정보)
- react-slick : 캐러셀(슬라이드 카드) 구현
- next-auth : 카카오 소셜 로그인 및 회원 가입
- next-pwa : progressive web app 배포

<br/>

## ⚙️ Environment

```json
"dependencies": {
    "@next/font": "13.1.1",
    "@reduxjs/toolkit": "^1.9.1",
    "@types/js-cookie": "^3.0.2",
    "@types/node": "18.11.18",
    "@types/react": "18.0.26",
    "@types/react-dom": "18.0.10",
    "eslint": "8.31.0",
    "eslint-config-next": "13.1.1",
    "next": "13.1.1",
    "next-auth": "^4.18.7",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-redux": "^8.0.5",
    "react-slick": "^0.29.0",
    "redux-persist": "^6.0.0",
    "redux-thunk": "^2.4.2",
    "slick-carousel": "^1.8.1",
    "typescript": "4.9.4"
  },
  "devDependencies": {
    "@types/react-slick": "^0.23.10"
  }
```

<br/>

## 📁 Folder Structure

#### pages

```
│   ├── pages
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   ├── api
│   │   │   ├── auth
│   │   │   │   └── [...nextauth].ts
│   │   │   └── hello.ts
│   │   ├── home
│   │   │   ├── index.tsx
│   │   │   └── mypage.tsx
│   │   ├── index.tsx
│   │   ├── kitchen
│   │   │   ├── detail
│   │   │   │   └── [recipeId].tsx
│   │   │   ├── filter.tsx
│   │   │   ├── index.tsx
│   │   │   ├── ourpick.tsx
│   │   │   └── process
│   │   │       ├── [recipeId].tsx
│   │   │       └── timer.tsx
│   │   ├── library
│   │   │   ├── add.tsx
│   │   │   ├── index.tsx
│   │   │   └── report.tsx
│   │   ├── onboarding
│   │   │   ├── index.tsx
│   │   │   └── splash.tsx
│   │   └── signup
│   │       ├── create-place.tsx
│   │       ├── enter-place.tsx
│   │       ├── index.tsx
│   │       ├── loading.tsx
│   │       └── survey.tsx
```

#### components
```
│   ├── components
│   │   ├── common
│   │   │   ├── Button.tsx
│   │   │   ├── FooterButton.tsx
│   │   │   ├── Hr.tsx
│   │   │   └── PushPageButton.tsx
│   │   ├── home
│   │   │   ├── HomeSlider.tsx
│   │   │   ├── MealCard.tsx
│   │   │   ├── ModalBasic.tsx
│   │   │   └── SugarCard.tsx
│   │   ├── kitchen
│   │   │   ├── DetailBox.tsx
│   │   │   ├── FilterButton.tsx
│   │   │   ├── ProcessCard.tsx
│   │   │   ├── RecipeCard.tsx
│   │   │   └── RecipeList.tsx
│   │   ├── layout
│   │   │   ├── Header.tsx
│   │   │   ├── Layout.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── TabBar.tsx
│   │   └── library
│   │       ├── BestWorstCards.tsx
│   │       └── WeeklySummary.tsx
```

#### etc
```
│   ├── assets
│   │   ├── font.ts
│   │   ├── getScreenWidth.tsx
│   │   ├── icon.ts
│   │   ├── illust.ts
│   │   ├── route.ts
│   │   └── styles.tsx
```
```
│   ├── hooks
│   │   ├── CopyClipBoard.tsx
│   │   └── Fetch.tsx
```
```
│   ├── interface
│   │   ├── diet.ts
│   │   ├── recipe.ts
│   │   └── sugarRecord.ts
```
```
│   └── store
│       ├── filterSlice.tsx
│       ├── store.tsx
│       ├── surveySlice.tsx
│       ├── teamSlice.tsx
│       ├── tokenSlice.tsx
│       └── userSlice.tsx
```


## ✨ Detail

<img width="350px" align="left" src="https://user-images.githubusercontent.com/75469131/217815679-9b93948a-42c4-467c-944a-4cab1bcc2330.png"/>
<img width="350px" align="" src="https://user-images.githubusercontent.com/75469131/217815690-1db07daa-3825-439d-8c96-85aec169bbdc.png"/>
<img width="350px" align="left" src="https://user-images.githubusercontent.com/75469131/217815698-adcc5813-253a-4db3-aeda-45e8ce414101.png"/>
<img width="350px" align="" src="https://user-images.githubusercontent.com/75469131/217815708-f9e06fd7-0672-4334-8723-44d0e6382979.png"/>
<img width="350px" align="left" src="https://user-images.githubusercontent.com/75469131/217815713-046cc0d1-9e68-47bb-bd95-f3dfd6dad912.png"/>
<img width="350px" align="" src="https://user-images.githubusercontent.com/75469131/217815715-8f2e8c19-5fc1-46d3-ba35-c5477056dfd7.png"/>
<img width="350px" align="left" src="https://user-images.githubusercontent.com/75469131/217815718-93acbfa5-c7b5-4aa0-9ef5-1ade31efae00.png"/>
<img width="350px" align="" src="https://user-images.githubusercontent.com/75469131/217815724-4ad4ed45-8d46-4532-8699-7064d8cd738a.png"/>
