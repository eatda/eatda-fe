import RecipeCard from "./RecipeCard"

interface RecipeListType {
    type: string;
}

export default function RecipeList({type} : RecipeListType){

    const height_container = type === 'top' ? 'auto' : '320px'
    const overflow_container = type === 'top' ? 'auto' : 'visible'
    const item_wrap = type === 'top' ? 'nowrap' : 'wrap'
    const item_width = type === 'top' ? 'auto' : '400px'


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
                dummyData.map((data,idx)=>{
                    return(
                        <RecipeCard
                        key={idx}
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
                
                height: ${height_container};
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
                width: ${item_width};

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