#ifdef RCT_NEW_ARCH_ENABLED
#import "FormikHelperView.h"

#import <react/renderer/components/RNFormikHelperViewSpec/ComponentDescriptors.h>
#import <react/renderer/components/RNFormikHelperViewSpec/EventEmitters.h>
#import <react/renderer/components/RNFormikHelperViewSpec/Props.h>
#import <react/renderer/components/RNFormikHelperViewSpec/RCTComponentViewHelpers.h>

#import "RCTFabricComponentsPlugins.h"
#import "Utils.h"

using namespace facebook::react;

@interface FormikHelperView () <RCTFormikHelperViewViewProtocol>

@end

@implementation FormikHelperView {
    UIView * _view;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
    return concreteComponentDescriptorProvider<FormikHelperViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const FormikHelperViewProps>();
    _props = defaultProps;

    _view = [[UIView alloc] init];

    self.contentView = _view;
  }

  return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
    const auto &oldViewProps = *std::static_pointer_cast<FormikHelperViewProps const>(_props);
    const auto &newViewProps = *std::static_pointer_cast<FormikHelperViewProps const>(props);

    if (oldViewProps.color != newViewProps.color) {
        NSString * colorToConvert = [[NSString alloc] initWithUTF8String: newViewProps.color.c_str()];
        [_view setBackgroundColor: [Utils hexStringToColor:colorToConvert]];
    }

    [super updateProps:props oldProps:oldProps];
}

Class<RCTComponentViewProtocol> FormikHelperViewCls(void)
{
    return FormikHelperView.class;
}

@end
#endif
