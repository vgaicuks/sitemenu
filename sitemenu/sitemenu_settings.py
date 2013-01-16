from django.conf import settings

PAGES = getattr(settings, 'SITEMENU_PAGES', (
    ('text', 'Text page', 'sitemenu.views.render_menupage'),
    ('redr', 'Redirect page', 'sitemenu.views.render_redirectpage'),
    ('indx', 'Index page', 'sitemenu.views.render_menupage'),
))

if 'qshop' in settings.INSTALLED_APPS:
    from qshop import qshop_settings
    PAGES += (
        ('', '---------', ''),
    )

    PAGES += qshop_settings.PAGES

MENUCLASS = getattr(settings, 'SITEMENU_MENUCLASS', 'sitemenu.models.Menu')