import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [appliedState, setAppliedState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleApply = (newState: ArticleStateType) => {
		setAppliedState(newState);
	};

	const handleReset = () => {
		setAppliedState(defaultArticleState);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': appliedState.fontFamilyOption.value,
					'--font-size': appliedState.fontSizeOption.value,
					'--font-color': appliedState.fontColor.value,
					'--container-width': appliedState.contentWidth.value,
					'--bg-color': appliedState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				onApply={handleApply}
				onReset={handleReset}
				initialState={defaultArticleState}
				appliedState={appliedState}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
