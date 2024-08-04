import React, { useState } from 'react';
import './Content.css';

function Content() {
    const [selectedContent, setSelectedContent] = useState('content1');

    const content = {
        content1: [
            { title: '<strong>What is it?</strong><br>Blood Collected straight from the donor into a blood bag and mixed with an anticoagulant is called as whole blood. This collected whole blood is then centrifuged and red cell, platelets and plasma are separated. The separated Red cells are mixed with a preservative to be called as packed red blood cells.', description: '<strong>User For?</strong><br>Correction of severe anemia in a number of conditions and blood loss in case of child birth, surgery or trauma settings.', description1: '<strong>How long does it take to donate?</strong><br> 15-30 minutes to donate including the pre-donation check-up.' },
            { title: '<strong>Who can donate?</strong><br> You need to be 18-65 years old, weight 45kg or more and be fit and healthy.', description: '<strong>Lasts For?</strong><br>Red cells can be stored for 42 days at 2-6 degree celsius.', description1: '<strong>How often can I donate?</strong><br>Male donors can donate again after 90 days and female donors can donate again after 120 days.' }
        ],
        content2: [
            { title: '<strong>What is it?</strong><br>The straw-coloured liquid in which red blood cells, white blood cells, and platelets float in is called plasma.Contains special nutrients which can be used to create 18 different type of medical products to treat many different medical conditions. Plasma can be obtained from the collected whole blood after red blood cells and platelets have been separated. Additionally, it can also be collected using an apheresis equipment where other components are returned to the donor. The former is a common method of plasma preparation in our country.', description: '<strong>User For?</strong><br>Used for bleeding patients with coagulation factor deficiency such as hemophilia A and B, von willibrand disease etc. also used in cases of blood loss due to trauma.', description1: '<strong>How long does it take to donate?</strong><br>15-30 minutes to donate including the pre-donation check-up.' },
            { title: '<strong>Who can donate?</strong><br>The donation criteria is similar to that of red blood cell. However, for apheresis plasma collection minimum weight is 50 kgs.', description: '<strong>Lasts For?</strong><br>Plasma after separation if frozen below -30 degrees can be stored up to one year.', description1: '<strong>How often can I donate?</strong><br>Similar to the red cell donation.' }
        ],
        content3: [
            { title: '<strong>What is it?</strong><br>These are cellular elements in blood which wedge together to help to clot and reduce bleeding. Always in high demand, Vital for people with low platelet count, like hematology and cancer patients.', description: '<strong>User For?</strong><br>Conditions with very low platelet count such as Cancer, blood diseases, trauma, dengue etc.', description1: '<strong>How long does it take to donate?</strong><br>We collect your blood, keep platelet and return rest to you by apheresis donation.' },
            { title: '<strong>Who can donate?</strong><br>One can donate whole blood from which the blood centre will separate platelets from other components. Criteria similar to whole blood donation apply. Alternatively, one can donate using apheresis equipment where only platelets are collected and rest components are returned back to donate. One need to satisfy whole blood criteria and pre- donation screening which include negative infectious markers and platelet count >1,50,000 per microlitre of blood. Weight should be >50kgs.', description: '<strong>Lasts For?</strong><br>can be stored for 5 days at 20-24 degree celsius.', description1: '<strong>How often can I donate?</strong><br>Every 2 weeks but should not exceed more than 24 times in a year.' }
        ]
    };

    return (
        <div className='home-page'>
            <div className='small-image top'>
                <img
                    src='/images/img-6.png'
                    alt='Small top'
                    // width='1210'
                    height='100'
                />
            </div>
            <div className='background-image'></div>
            <div className='content-box'>
                <h1>Types of Donation</h1>
                <div className='underline'>
                    <span className='line'></span>
                    <img src='/images/img-3.png' alt='Decoration' className='underline-image' />
                    <span className='line'></span>
                </div>
                <p>The average human body contains about five litres of blood, which is made of several cellular and non-cellular components such as Red blood cell, Platelet, and Plasma.</p>
                <p>Each type of component has its unique properties and can be used for different indications. The donated blood is separated into these components by the blood centre and one donated unit can save up to four lives depending on the number of components separated from your blood.</p>
                <div className='headers'>
                    <h3
                        onClick={() => setSelectedContent('content1')}
                        className={selectedContent === 'content1' ? 'active' : ''}
                    >
                        Packed Red Blood cells
                    </h3>
                    <h3
                        onClick={() => setSelectedContent('content2')}
                        className={selectedContent === 'content2' ? 'active' : ''}
                    >
                        Plasma
                    </h3>
                    <h3
                        onClick={() => setSelectedContent('content3')}
                        className={selectedContent === 'content3' ? 'active' : ''}
                    >
                        Platelets
                    </h3>
                </div>
                <div className='content'>
                    <table>
                        <tbody>
                            {content[selectedContent].map((item, index) => (
                                <tr key={index}>
                                    <td dangerouslySetInnerHTML={{ __html: item.title }}></td>
                                    <td dangerouslySetInnerHTML={{ __html: item.description }}></td>
                                    <td dangerouslySetInnerHTML={{ __html: item.description1 }}></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Content;
