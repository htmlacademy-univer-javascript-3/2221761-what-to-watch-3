import {describe, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import {withHistory} from '../../utils';
import {Logo} from './logo.tsx';

describe('Component: Logo', () => {
  it('should render correctly', () => {
    render(withHistory(<Logo/>));

    screen.getAllByText('W').forEach((el) => {
      expect(el).toBeInTheDocument();
    });

    expect(screen.getByText('T')).toBeInTheDocument();
  });
});
