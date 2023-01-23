import RecipeList from "../../components/recipe/RecipeList"
import colors from "../../../styles"
import MiniHeader from "../../components/common/MiniHeader"
import Header from "../../components/common/Header"
import { useEffect, useState } from "react"
import { selectToken } from "../../store/tokenSlice";
import { useSelector, useDispatch } from "react-redux";

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
    const token = useSelector(selectToken);
    const [pick, setPick] = useState<pickI[]>();

    const fetchPick = async () => {
        const URL = `${process.env.NEXT_PUBLIC_API_ROOT}users/diet/like/`;
        try {
            const data = await fetch(URL,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    Authorization : token.access_token
                }
            })
            const res = await data.json();
            return {data, res};
        } catch (error) {
            return error;
        }
    }
    useEffect(()=>{
        async function fetchData() {
            const {data, res} : any = await fetchPick();
            if(data.ok){
                console.log(res);
                setPick(res.indivisual_list);
                setPopularPick(res.popular_pick);
            }else{
                console.log('error');
            }
        }
        fetchData();
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
                            <RecipeList key={i} type="pick" data={popularPick} popular={true}/>
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
                        type="pick"
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