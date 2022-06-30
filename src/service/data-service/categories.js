`use strict`;

class CategoriesService {
  constructor(offers) {
    this._offers = offers;
  }

  findAll() {
    const offers = this._offers.reduce((acc, offer) => {
      offer.categories.forEach((category) => acc.add(category));
      return acc;
    }, new Set());

    return [...offers];
  }
}

module.exports = CategoriesService;
