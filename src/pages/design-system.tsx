import React from "react";
import Layout from "../components/common/Layout";
import AnimateInView, { AnimationType } from "../components/ui/AnimateInView";

const DesignSystem: React.FC = () => {
  // All animation types for demonstration
  const animations: AnimationType[] = [
    "fade",
    "slide-up",
    "slide-down",
    "slide-left",
    "slide-right",
    "scale-up",
    "scale-down",
    "rotate",
  ];

  return (
    <Layout>
      <div className="container mx-auto py-12">
        <h1 className="text-h1 mb-12 text-center">Design System</h1>

        <section className="mb-16">
          <h2 className="text-h2 mb-8">Typography</h2>

          <div className="grid gap-6">
            <div className="p-6 bg-card rounded-lg shadow">
              <h1 className="text-display-1">Display 1</h1>
              <p className="text-sm text-gray-500 mt-2">text-display-1</p>
            </div>

            <div className="p-6 bg-card rounded-lg shadow">
              <h1 className="text-display-2">Display 2</h1>
              <p className="text-sm text-gray-500 mt-2">text-display-2</p>
            </div>

            <div className="p-6 bg-card rounded-lg shadow">
              <h1 className="text-h1">Heading 1</h1>
              <p className="text-sm text-gray-500 mt-2">text-h1</p>
            </div>

            <div className="p-6 bg-card rounded-lg shadow">
              <h2 className="text-h2">Heading 2</h2>
              <p className="text-sm text-gray-500 mt-2">text-h2</p>
            </div>

            <div className="p-6 bg-card rounded-lg shadow">
              <h3 className="text-h3">Heading 3</h3>
              <p className="text-sm text-gray-500 mt-2">text-h3</p>
            </div>

            <div className="p-6 bg-card rounded-lg shadow">
              <h4 className="text-h4">Heading 4</h4>
              <p className="text-sm text-gray-500 mt-2">text-h4</p>
            </div>

            <div className="p-6 bg-card rounded-lg shadow">
              <h5 className="text-h5">Heading 5</h5>
              <p className="text-sm text-gray-500 mt-2">text-h5</p>
            </div>

            <div className="p-6 bg-card rounded-lg shadow">
              <p className="text-body-xl">
                Body XL - The quick brown fox jumps over the lazy dog.
              </p>
              <p className="text-sm text-gray-500 mt-2">text-body-xl</p>
            </div>

            <div className="p-6 bg-card rounded-lg shadow">
              <p className="text-body-lg">
                Body Large - The quick brown fox jumps over the lazy dog.
              </p>
              <p className="text-sm text-gray-500 mt-2">text-body-lg</p>
            </div>

            <div className="p-6 bg-card rounded-lg shadow">
              <p className="text-body">
                Body - The quick brown fox jumps over the lazy dog.
              </p>
              <p className="text-sm text-gray-500 mt-2">text-body</p>
            </div>

            <div className="p-6 bg-card rounded-lg shadow">
              <p className="text-body-sm">
                Body Small - The quick brown fox jumps over the lazy dog.
              </p>
              <p className="text-sm text-gray-500 mt-2">text-body-sm</p>
            </div>

            <div className="p-6 bg-card rounded-lg shadow">
              <p className="text-body-xs">
                Body XS - The quick brown fox jumps over the lazy dog.
              </p>
              <p className="text-sm text-gray-500 mt-2">text-body-xs</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-h2 mb-8">Colors</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-4">
              <div className="h-24 bg-primary rounded-lg shadow-md"></div>
              <p>Primary (--primary-color)</p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="h-24 bg-primary-light rounded-lg shadow-md"></div>
              <p>Primary Light (--primary-color-light)</p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="h-24 bg-primary-dark rounded-lg shadow-md"></div>
              <p>Primary Dark (--primary-color-dark)</p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="h-24 bg-secondary rounded-lg shadow-md"></div>
              <p>Secondary (--secondary-color)</p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="h-24 bg-secondary-light rounded-lg shadow-md"></div>
              <p>Secondary Light (--secondary-color-light)</p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="h-24 bg-secondary-dark rounded-lg shadow-md"></div>
              <p>Secondary Dark (--secondary-color-dark)</p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="h-24 bg-background rounded-lg shadow-md"></div>
              <p>Background (--background-color)</p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="h-24 bg-card rounded-lg shadow-md"></div>
              <p>Card (--card-background)</p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="h-24 border-2 border-border rounded-lg"></div>
              <p>Border (--border-color)</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-h2 mb-8">Shadows</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 bg-card rounded-lg shadow-sm">
              <div className="h-24 flex items-center justify-center">
                <p>shadow-sm</p>
              </div>
            </div>

            <div className="p-6 bg-card rounded-lg shadow">
              <div className="h-24 flex items-center justify-center">
                <p>shadow (default)</p>
              </div>
            </div>

            <div className="p-6 bg-card rounded-lg shadow-lg">
              <div className="h-24 flex items-center justify-center">
                <p>shadow-lg</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-h2 mb-8">Animations</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {animations.map((animation) => (
              <div
                key={animation}
                className="p-6 bg-card rounded-lg h-48 flex flex-col"
              >
                <p className="mb-4">{animation}</p>
                <AnimateInView
                  animation={animation as AnimationType}
                  className="flex-1 bg-primary/20 rounded-lg flex items-center justify-center"
                  delay={0.2}
                  once={false}
                >
                  <div className="w-16 h-16 bg-primary rounded-lg"></div>
                </AnimateInView>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-h2 mb-8">Buttons</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-card rounded-lg flex flex-col gap-4">
              <h3 className="text-h4 mb-2">Primary Buttons</h3>
              <button className="btn btn-primary">Button Primary</button>
              <button className="btn btn-primary opacity-75">
                Button Primary Hover
              </button>
              <button className="btn btn-primary opacity-50" disabled>
                Button Primary Disabled
              </button>
            </div>

            <div className="p-6 bg-card rounded-lg flex flex-col gap-4">
              <h3 className="text-h4 mb-2">Secondary Buttons</h3>
              <button className="btn btn-secondary">Button Secondary</button>
              <button className="btn btn-secondary opacity-75">
                Button Secondary Hover
              </button>
              <button className="btn btn-secondary opacity-50" disabled>
                Button Secondary Disabled
              </button>
            </div>

            <div className="p-6 bg-card rounded-lg flex flex-col gap-4">
              <h3 className="text-h4 mb-2">Outline Buttons</h3>
              <button className="btn btn-outline">Button Outline</button>
              <button className="btn btn-outline opacity-75">
                Button Outline Hover
              </button>
              <button className="btn btn-outline opacity-50" disabled>
                Button Outline Disabled
              </button>
            </div>

            <div className="p-6 bg-card rounded-lg flex flex-col gap-4">
              <h3 className="text-h4 mb-2">Button Sizes</h3>
              <button className="btn btn-primary text-sm py-1 px-3">
                Small Button
              </button>
              <button className="btn btn-primary">Default Button</button>
              <button className="btn btn-primary text-lg py-3 px-6">
                Large Button
              </button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default DesignSystem;
