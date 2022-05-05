![logo](/docs/assets/product-pulse.png)

**Get a snapshot of a product's or project's health based on user data and activity.**

## Highlights

- **Get a high-level look at product health** based on repo activity, seeing scores for Direction, Maintenance, and Community health.
- **Criteria can be adopted for low/no code products** making this inclusive of all types of technical projects
- **Integrate Product Pulse with other non-repo services** like other project management solutions (Asana, Monday, etc.)

## Usage and configuration

![Image of tool](/docs/assets/example.png)

Users can input their public GitHub repo into Product Pulse and get their scores. Product managers can visualize multiple product cards to keep tabs on the health of products and their dependencies.

## Future state / roadmap

We want offer a backend service that provides endpoints for:
* JSON output of data so you can interpret and visualize the data as you see useful
* Badge output so you can add it to your readme or website to see product health
* An embeddable "card" to use on a custom website or dashboard

Please see our [documentation](/docs) for more details on our roadmap.

## Motivation

Our amazing team created Product Pulse as part of Hack Week May 2022 to help fellow product builders have a quick way to gauge the health of other products and projects they might want to use. Product builders can use Product Pulse to gauge the health of their products, but also see the health of others.

This can ease the way in which we identify which products are doing well, and which products might need some help. The sooner we can identify products that need help, the sooner we can reduce friction and burnout from the challenges involved in maintaining products.

The initial GitHub interpretation of this product uses repo activity to determine how healthy a product is. We gauge product health by:

* **Direction** - Are there owners and leaders of this product directing the work toward successful outcomes?
* **Maintenance** - Are commits, issues, and PRs being created, reviewed, and closed to help maintain product health?
* **Community** - Are there external contributors and metrics indicating that the product is growing and supporting its community?

This is all up for improvement as more people use this hack week project.

## Documentation

Please see our [documentation](/docs) for more details on the health metrics, math, and our roadmap.

## Contributing

The best way to contribute to Product Pulse is to test it out by inputting your product repos into it and letting us know what you think.

## License

Product Pulse is free software, and may be redistributed under the terms specified in the [license](https://github.com/balena-io-playground/blob/master/LICENSE).