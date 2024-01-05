import {describe, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import {withHistory} from '../../utils';
import {NotFound} from './not-found.tsx';

describe('Component: NotFound', () => {
  it('should render correctly', () => {
    const expectedText = 'Похоже что такой страницы нет...';
    const expectedLinkText = 'Вернуться на главную страницу';

    render(withHistory(<NotFound/>));

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
  });
});
