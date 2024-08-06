import React from 'react'
import image from './../assets/image.png'

function Founder() {
    return (
        <div className='w-full h-full  overflow-y-scroll'>

            <div className='w-full h-max p-6 pb-20 flex flex-col justify-start items-start'>
                <h1 className='text-4xl font-bold mt-1 mb-3'>About The Founder</h1>
                <h2 className='text-2xl font-bold my-1'>Diganta Biswas - Founder & CEO</h2>
                <img className='w-[20rem] h-[20rem] bg-clip-border rounded-full m-10' src={image} alt="image of Diganta Biswas, the founder and ceo" />
                <p>Welcome to Confessionity, an innovative platform designed to offer a safe haven for introverts and those battling depression. Our mission is to provide a space where users can express their thoughts and share their experiences without fear of judgment or exposure</p>
                <br />
                <br />
                <h2 className='text-2xl font-bold my-1'>Vision and Mission</h2>
                <p>In a world where social interaction can often be daunting, especially for those who are introverted or suffering from depression, Confessionity aims to bridge the gap. The vision behind this platform is to empower individuals by giving them a voice and a community, all while maintaining their anonymity.</p>
                <br />
                <br />
                <h2 className='text-2xl font-bold my-1'>The Journey</h2>
                <p>As someone who understands the challenges faced by introverts and individuals struggling with mental health issues, I, Diganta Biswas, was inspired to create Confessionity. This platform emerged from a deep desire to help others navigate their personal struggles in a safe and supportive environment.</p>
                <br />
                <br />
                <h2 className='text-2xl font-bold my-1'>Our Commitment</h2>
                <p>At Confessionity, we are committed to ensuring the anonymity and security of our users. We believe that everyone deserves a space where they can be themselves without fear of repercussions. Our platform is designed with robust privacy measures to protect our users' identities, allowing them to share their thoughts and seek advice freely.</p>
                <br />
                <br />
                <h2 className='text-2xl font-bold my-1'>Join Us</h2>
                <p>We invite you to join our community at Confessionity, where you can connect with others, share your experiences, and find support. Together, we can create a space where everyone feels heard and valued.</p>
                <br /><br />
                <h3>Contact Information</h3>
                <ul>
                    <li>Follow us on <a href="https://www.instagram.com/confessionity/">Instagram</a></li>
                </ul>
                

            </div>


        </div>
    )
}

export default Founder