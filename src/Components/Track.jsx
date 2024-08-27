import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import { Food } from './Food'
import { Header } from './Header'
import biryani from '../images/birryani.png'




export const Track = () => {

    const loggedData = useContext(UserContext)

    const [foodItems, setFoodItems] = useState([]);

    const [allItems, setAllItems] = useState([]);

    let [inpData, setInpData] = useState("");




    const [food, setFood] = useState(null);

    useEffect(() => {
        console.log(inpData + " hewre")
    })

    useEffect(() => {
        fetch(`http://localhost:8000/foods`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${loggedData.loggedUser.token}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setAllItems(data)

            })
            .catch((err) => {
                console.log(err);
            })
    }, [])


    function searchFood(e) {
        setInpData(e.target.value)
        if (e.target.value.length !== 0) {
            fetch(`http://localhost:8000/foods/${e.target.value}`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${loggedData.loggedUser.token}`
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    if (data.message === undefined) {

                        setFoodItems(data);
                    }
                    else {

                        setFoodItems([])
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            setFoodItems([])
        }
    }


    function displayItem(id) {
        console.log(id)
    }

    return (
        <>
            <Header />
            <section className='container track-container'>

                <div className='search'>
                    <input type='search' placeholder='Search Food Item' value={inpData} className='serach-inp' onChange={searchFood} />

                    {
                        foodItems.length !== 0 ? (
                            <div className='search-results' id='search-results'>

                                {
                                    foodItems.map((item) => {
                                        return (
                                            <p onClick={() => {
                                                setFood(item)
                                                displayItem(item._id)
                                                setInpData("")
                                                document.getElementById("search-results").style.display = "none"
                                                Array.from(document.getElementsByClassName("food-tracking")).map((val) => { val.style.display = "none" });

                                            }} className='foodName' id='foodName' key={item._id}> {item.name}</p>
                                        )
                                    })
                                }

                            </div>

                        ) : null

                    }


                </div>


                {
                    food !== null ? (

                        <Food food={food} />
                    )
                        :
                        null
                }


                {
                    allItems.map((food) => {
                        return (
                            <div className='item' id='item'>
                                <div className='food food-tracking' onClick={() => {
                                    setFood(food)
                                    displayItem(food._id)
                                    setInpData("")
                                    // document.getElementById("search-results").style.display = "none"
                                    Array.from(document.getElementsByClassName("food-tracking")).map((val) => { val.style.display = "none" });
                                }
                                } >
                                    <div className='food-img'>
                                        <img src={biryani} alt='biryani' className='food-image' />
                                    </div>
                                    <div className='food-details' >
                                        <h1 className='food-heading food-track-heading'>{food.name} ({food.carbohydrates} KCal for {food.quantity}g)</h1>
                                        <div className='core-details'>
                                            <div className='nutrient'>
                                                <p className='n-title'>Calories :</p>
                                                <p className='n-value'>{food.calories}g</p>
                                            </div>
                                            <div className='nutrient'>
                                                <p className='n-title'>Proteins :</p>
                                                <p className='n-value'>{food.protein}g</p>
                                            </div>
                                            <div className='nutrient'>
                                                <p className='n-title'>Carbohydrates :</p>
                                                <p className='n-value'>{food.carbohydrates}g</p>
                                            </div>
                                            <div className='nutrient'>
                                                <p className='n-title'>Fat :</p>
                                                <p className='n-value'>{food.fat}g</p>
                                            </div>
                                            <div className='nutrient'>
                                                <p className='n-title'>Fibre :</p>
                                                <p className='n-value'>{food.fiber}g</p>
                                            </div>
                                        </div>



                                    </div>


                                </div>
                            </div>
                        )
                    })

                }




            </section>
        </>

    )
}
