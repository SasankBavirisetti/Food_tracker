import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import biryani from '../images/birryani.png'
import { Header } from './Header.jsx'



export const Diet = () => {

    let loggedData = useContext(UserContext);

    const [items, setItems] = useState([]);
    const [date, setDate] = useState(new Date())

    let [total, setTotal] = useState({
        totalCaloreis: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFats: 0,
        totalFiber: 0
    })

    function calculateTotal() {



        let totalCopy = {
            totalCaloreis: 0,
            totalProtein: 0,
            totalCarbs: 0,
            totalFats: 0,
            totalFiber: 0
        };

        items.forEach((item) => {
            totalCopy.totalCaloreis += item.details.calories;
            totalCopy.totalProtein += item.details.protein;
            totalCopy.totalCarbs += item.details.carbohydrates;
            totalCopy.totalFats += item.details.fat;
            totalCopy.totalFiber += item.details.fiber;

        })

        setTotal(totalCopy);


    }


    useEffect(() => {
        fetch(`http://localhost:8000/track/${loggedData.loggedUser.userId}/${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${loggedData.loggedUser.token}`,
            }
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                setItems(data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [date])



    useEffect(() => {
        calculateTotal();
    }, [items])

    return (
        <>

            <Header />
            <div className='above-section mode'>

                <div className="item mode">

                    <h3> Total Calories :  {total.totalCaloreis} Kcal </h3>

                    <p>Protein {total.totalProtein}g, Carbohydrates {total.totalCarbs}g, Fats {total.totalFats}g, Fiber {total.totalFiber}g</p>

                </div>
                <input type="date" className='date-track'  onChange={(event) => {
                    setDate(new Date(event.target.value));
                }} />

            </div>

            <section className='container diet-container mode'>



                {
                    items.map((item) => {
                        let food = item.foodId;
                        return (
                            <div className='item'>
                                <div className='food food-tracking'>
                                    <div className='food-img'>
                                        <img src={food.imageUrl} alt={food.name} className='food-image' />
                                    </div>
                                    <div className='food-details' >
                                        <h1 className='food-heading food-track-heading'>{food.name} ({food.carbohydrates} KCal for {item.quantity}g)</h1>
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
