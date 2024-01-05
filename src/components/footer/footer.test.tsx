import { render, screen } from '@testing-library/react';
import {withHistory} from '../../utils';
import {Footer} from './footer.tsx';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const text = /© 2019 What to watch Ltd./i;
    render(withHistory(<Footer />));

    screen.getAllByText('W').forEach((el) => {
      expect(el).toBeInTheDocument();
    });
    expect(screen.getByText('T')).toBeInTheDocument();
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
