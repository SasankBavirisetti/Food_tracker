import React, { useContext, useEffect, useState } from 'react'
import biryani from '../images/birryani.png'
import { UserContext } from '../contexts/UserContext'



export const Food = (props) => {







    // console.log(food)
    const [quantity, setQuantity] = useState(100)
    const [food, setFood] = useState({})
    const [foodInitial, setFoodInitial] = useState({});
    let loggedData = useContext(UserContext);

    function trackFoodItem() {
        let trackedFoodItem = {
            userId: loggedData.loggedUser.userId,
            foodId: food._id,
            details: {
                protein: food.protein,
                carbohydrates: food.carbohydrates,
                fat: food.fat,
                fiber: food.fiber,
                calories: food.calories
            },
            quantity: quantity
        }
        console.log(trackedFoodItem)



        fetch("http://localhost:8000/track", {
            method: "POST",
            body: JSON.stringify(trackedFoodItem),
            headers: {
                "Authorization": `Bearer ${loggedData.loggedUser.token}`,
                "Content-Type": "Application/json"
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            })
    }




    useEffect(() => {
        setFood(props.food);
        setFoodInitial(props.food)
        console.log(loggedData)
        console.log(props.food)
    }, [props.food])

    function handleInput(e) {
        setQuantity(Number(e.target.value))
    }


    function calculateMacros(event) {
        setQuantity(event.target.value)
        if (event.target.value.length !== 0) {
            let quantity = Number(event.target.value);

            let copyFood = { ...food };

            copyFood.protein = (foodInitial.protein * quantity) / 100;
            copyFood.carbohydrates = (foodInitial.carbohydrates * quantity) / 100;
            copyFood.fat = (foodInitial.fat * quantity) / 100;
            copyFood.fiber = (foodInitial.fiber * quantity) / 100;
            copyFood.calories = (foodInitial.calories * quantity) / 100;

            setFood(copyFood);
        } else {
            setFood(foodInitial);
            setQuantity(100)
        }

    }

    return (
        <div className='food'>
            <div className='food-img'>
                <img src={food.imageUrl} alt={food.name} className='food-image' />
            </div>
            <div className='food-details' >
                <h1 className='food-heading'>{food.name} ({food.carbohydrates} KCal for {quantity}g)</h1>
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
                <input type='number' onChange={calculateMacros} placeholder='Quantity in grams' className='inp quantity-inp' />
                <button className='btn track-btn' onClick={trackFoodItem}>Track this food</button>


            </div>


        </div>
    )
}
