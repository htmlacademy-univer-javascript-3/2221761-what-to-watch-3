import {describe, expect} from 'vitest';
import {withHistory} from '../../utils';
import {render, screen} from '@testing-library/react';
import {Spinner} from './spinner.tsx';

describe('component: Spinner', () => {
  it ('should render correctly', () => {
    const spinnerId = 'spinner';

    render(withHistory(<Spinner/>));

    expect(screen.getByTestId(spinnerId)).toBeInTheDocument();
  });
});
