import React from 'react'
import {Helmet }  from 'react-helmet'

const Meta = ({title, description, keywords, icon}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta description='description' content={description} />
            <meta description='keyword' content={keywords} />
            <link rel="icon" href={icon} />

        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Welcome to Cosmetic Shop',
    description: 'We sell the best products very cheap',
    keywords: 'electronics, buy electronics, cheap electronics',
    icon: 'https://icons.iconarchive.com/icons/custom-icon-design/pretty-office-11/256/shop-icon.png'
}

export default Meta
