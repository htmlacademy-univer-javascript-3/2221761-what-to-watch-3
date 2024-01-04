import { render, screen } from '@testing-library/react';
import { makeFakeStore } from '../../utils/mocks';
import {withHistory, withStore} from '../../utils/mock-components.tsx';
import {MyList} from './my-list.tsx';


describe('MyListScreen', () => {
  it('render correctly', () => {
    const { withStoreComponent } = withStore(withHistory(<MyList />), makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
  });
});
