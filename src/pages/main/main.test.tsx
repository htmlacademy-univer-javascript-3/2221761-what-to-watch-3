import { render, screen } from '@testing-library/react';
import { makeFakeStore } from '../../utils/mocks';
import {withHistory, withStore} from '../../utils/mock-components.tsx';
import {Main} from './main.tsx';

describe('MainScreen', () => {
  it('render correctly', () => {
    const { withStoreComponent } = withStore(
      withHistory(<Main />),
      makeFakeStore()
    );
    render(withStoreComponent);

    expect(screen.getByTestId('page-content')).toBeInTheDocument();
    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
  });
});
