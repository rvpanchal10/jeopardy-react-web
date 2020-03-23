/* eslint-disable no-undefined */
import React from 'react';
import lodash from 'lodash';

import { Category } from '../Category';
import { Questions } from '../Questions';

import Grid from '@material-ui/core/Grid';

class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.renderCategoriesList = this.renderCategoriesList.bind(this);
    }

    renderCategoriesList = () => {
        let CategoryComps = [];
        const { categories, onSelect, questions } = this.props;
        Object.keys(categories).forEach((id) => {
            CategoryComps.push(
                <Category key={`category-${categories[id].id}`} title={categories[id].title}>
                    <Questions onSelect={onSelect} questions={lodash.filter(questions, { categoryId: parseInt(id) })} />
                </Category>
            );
        });

        return CategoryComps;
    }

    render() {
        const { categories } = this.props;
        return (
            <div className="view bg-black" style={{ padding: '0 10px' }}>
                <Grid container style={{ margin: '10px auto 0', padding: '15px 25px', height: '70%' }} className="flex flex-middle flex-start bg-gray">
                    {Object.keys(categories).length ? this.renderCategoriesList() : null}
                </Grid>
            </div>
        );
    }
}

const connectedCategories = Categories;
export { connectedCategories as Categories };
