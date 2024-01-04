import { makeFakePreviewFilms } from '../../utils/mocks';
import { render, screen } from '@testing-library/react';
import {Card} from './card.tsx';
import {withHistory} from '../../utils/mock-components.tsx';

describe('SmallFilmCard', () => {
  it('render correctly', () => {
    const smallFilmCard = makeFakePreviewFilms()[0];

    const smallFilmCardImageId = 'card-image';

    const preparedComponent = withHistory(
      <Card
        id={smallFilmCard.id}
        name={smallFilmCard.name}
        previewImage={smallFilmCard.previewImage}
        previewVideoLink={smallFilmCard.previewVideoLink}
        isPlayingPreviewVideo={false}
        onSmallFilmCardMouseOut={() => ''}
        onSmallFilmCardMouseOver={() => ''}
      />
    );

    render(preparedComponent);

    expect(screen.getByText(smallFilmCard.name)).toBeInTheDocument();
    expect(screen.getByTestId(smallFilmCardImageId)).toBeInTheDocument();
  });
});
