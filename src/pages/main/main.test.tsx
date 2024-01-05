import { render, screen } from '@testing-library/react';
import {Main} from './main.tsx';
import {makeFakeStore, withHistory, withStore} from '../../utils';

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
