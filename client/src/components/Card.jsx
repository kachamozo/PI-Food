import React from 'react';

export default function Card({ name, image, dietTypes, diets, id }) {
    return (
        <div key={id}>
            <h3>{name}</h3>
            <div>
                {' '}
                {dietTypes?.map((e) => (
                    <h5>{e}</h5>
                ))}{' '}
                {diets?.map((e) => (
                    <h5>{e.name}</h5>
                ))}
            </div>
            <img
                src={
                    image
                        ? image
                        : 'https://saboresbolivianos.com/wp-content/uploads/sopa-de-mani.jpg'
                }
                alt='img not found'
                width='250px'
                height='250px'
            />
        </div>
    );
}
