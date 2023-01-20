import RecipeCard from "./RecipeCard"

interface RecipeListType {
    type: string;
    data?: any;
    name?: string;
}

export default function RecipeList({type, data, name} : RecipeListType){

    const overflow_container = type === 'right' ? 'auto' : 'visible'
    const item_wrap = type === 'right' ? 'nowrap' : 'wrap'

    const dummyData = [
        {
            id:1,
            name: '11'
        },
        {
            id:2,
            name: '22'
        },
        {
            id:3,
            name: '33'
        },
        {
            id:4,
            name: '44'
        },
        {
            id:5,
            name: '55'
        },
        {
            id:6,
            name: '66'
        },
    ]

    return(
        <>
        <div className="container">
            <div className="item">
            {
                data ?
                data.map((v:any,i:number)=>{
                    // console.log('RL:',name,':',v)
                    return(
                        <RecipeCard
                        key={i}
                        type={type}
                        name={name}

                        image={v.diet.image}
                        comment={v.diet.name.comment}
                        title={v.diet.name.title}
                        is_me_liked={v.is_me_liked}
                        who_liked={v.who_liked}
                        />
                    )
                })
                :
                dummyData.map((data,idx)=>{
                    return(
                        <RecipeCard
                        key={idx}
                        type={type}
                        />
                    )
                })
            }
            </div>
        </div>
        <style jsx>{`
            .container {
                display: flex;
                flex-direction: column;
                
                height: auto;
                margin-bottom: 24px;

                overflow: ${overflow_container};
                -ms-overflow-style: none; /* 인터넷 익스플로러 */
                scrollbar-width: none; /* 파이어폭스 */
            }
            .container::-webkit-scrollbar {
                display: none; /* 크롬, 사파리, 오페라, 엣지 */
            }

            .item {
                display: flex;
                flex-wrap: ${item_wrap};
                width: auto;

                overflow: auto;
                -ms-overflow-style: none; /* 인터넷 익스플로러 */
                scrollbar-width: none; /* 파이어폭스 */
            }
            .item::-webkit-scrollbar {
                display: none; /* 크롬, 사파리, 오페라, 엣지 */
            }
        `}</style>
        </>
    )
}