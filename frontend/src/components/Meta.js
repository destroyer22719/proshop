import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({
    title = "Welcome to Proshop",
    description = "We sell the best products for cheap",
    keywords = "electronics, buy electronics",
}) => {
    return (
        <div>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keyword" content={keywords} />
            </Helmet>
        </div>
    );
};

export default Meta;
