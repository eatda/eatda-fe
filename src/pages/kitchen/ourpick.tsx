import RecipeList from "../../components/recipe/RecipeList"
import colors from "../../../styles"
import MiniHeader from "../../components/common/MiniHeader"
import Header from "../../components/common/Header"
import { useEffect, useState } from "react"

const dummyData = {
	"popular_pick" : [ //가족들의 인기 픽 리스트
		{ //좋아요 많이 받은 순으로 보내기
			"diet" : {
                "id" : 0,
                "name" : {
                    "comment" : "마음까지 신선해지는",
                    "title" : "냉파스타 샐러드"
                },
                "image" : "src 경로에 들어갈 url"
            },
			"is_me_liked" : false,  
			"who_liked" : [0, 2, 3]
		},	
		{ //좋아요 많이 받은 순으로 보내기
			"diet" : {
                "id" : 1,
                "name" : {
                    "comment" : "마음까지 s신선해지는2",
                    "title" : "냉파스타 샐러드2"
                },
                "image" : "src 경로에 들어갈 url2"
            },
			"is_me_liked" : true,  
			"who_liked" : [0, 3]
		},	
	],
	"indivisual_list" : [ // 같은 그룹에서 각자들이 좋아요한거
		{
			"user_name" : "파파존스",
			"is_exist" : true, // diet 리스트 존재 여부 (만약에 없으면 선택하신 pick이 없습니다라고 뜨게 하는 용도)
			"data" : [
				{
					"diet" : {
						"id" : 0,
				  	"name" : {
				  		"comment" : "마음까지 신선해지는",
				  		"title" : "냉파스타 샐러드"
				  	},
				  	"image" : "src 경로에 들어갈 url"
				  },
					"is_me_liked" : true
				},
				{
					"diet" : {
						"id" : 2,
				  	"name" : {
				  		"comment" : "마음까지 신선해dd지는",
				  		"title" : "냉파스타 샐dd러드"
				  	},
				  	"image" : "src 경로에 들어갈 url"
				  },
					"is_me_liked" : false
				},
				{
					"diet" : {
						"id" : 3,
				  	"name" : {
				  		"comment" : "마음까지 신선se해dd지는",
				  		"title" : "냉파스타 샐dd러드"
				  	},
				  	"image" : "src 경로에 들어갈 url"
				  },
					"is_me_liked" : false
				},
			]
		},
		{
			"user_name" : "맘스터치",
			"is_exist" : false,
			"data" : []
		},
		{
			"user_name" : "도라",
			"is_exist" : true, // diet 리스트 존재 여부 (만약에 없으면 선택하신 pick이 없습니다라고 뜨게 하는 용도)
			"data" : [
				{
					"diet" : {
						"id" : 0,
				  	"name" : {
				  		"comment" : "마음까지 신선해지는",
				  		"title" : "냉파스타 샐러드"
				  	},
				  	"image" : "src 경로에 들어갈 url"
				  },
					"is_me_liked" : false
				},
			]
		},
	]
}	

interface popularPickI {
    diet: {
        id: number;
        name: {
            comment: string;
            title: string;
        };
        image: string;
    };
    is_me_liked: boolean;
    who_liked: number[];
}

interface pickI{
    user_name: string;
    is_exist: boolean;
    data: {
        diet: {
            id: number;
            name: {
                comment: string;
                title: string;
            };
            image: string;
        };
        is_me_liked: boolean;
    }[];
}

export default function OurPick(){
    const [popularPick, setPopularPick] = useState<popularPickI[]>();
    const [pick, setPick] = useState<pickI[]>();
    useEffect(()=>{
        setPopularPick(dummyData.popular_pick);
        setPick(dummyData.indivisual_list);
        console.log(dummyData.indivisual_list);
    },[])

    return(
        <div className="box">
        <Header text="주방"/>
        <div className='miniHeader'>
            <MiniHeader left="추천 식사" right="Our Pick!" leftURL="/kitchen" rightURL="/kitchen/ourpick"/>
        </div>
        <div className="container">
            가족들의 인기 PICK! <br/>
            <div className="margin">
                {
                    [0].map((v,i)=>{
                        return(
                            <RecipeList key={i} type="right" data={popularPick} name="popular"/>
                        )
                    })
                }
            </div>
        </div>
        <div className="bar" />
        <div className="container">
            {
                pick?.map((v,i)=>{
                    console.log(v)
                    return(
                        <div key={i}>
                        {v.user_name}
                        {v.is_exist ?
                        <div className="margin">
                        <RecipeList 
                        key={i}
                        type="right"
                        data={v.data}
                        />
                        </div>
                        :
                        <>
                        <br/>
                        없을 때 <br/><br/>
                        </>
                        }
                        </div>
                    )
                })
            }
        </div>
        <style jsx>{`
            .box {
                width: 390px
            }
            .container {
                margin-left: 20px;
                width: 390px
                background: black;
            }
            .bar {
                background: ${colors.grayBackgroundSub};
                height: 8px;
                width: 390px;

                margin-bottom: 18px;
            }
            .miniHeader {
                margin-top: 25px;
            }
            .margin {
                margin-right: 20px
            }
        `}</style>
        </div>
    )
}