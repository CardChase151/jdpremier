#!/usr/bin/env python3
"""Build a fillable AcroForm PDF for JD Premier Logistics intake.

Uses reportlab directly so every input is a real form field Jacob can click
+ type into. Visual treatment follows the brand: red #D72027 + blue #0E2D70.
"""
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor, Color, white
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from pathlib import Path
import sys

OUT = Path(__file__).parent / 'jd-premier-questionnaire.pdf'
LOGO = Path(__file__).parent / 'logo.png'

# ─────── colors / sizing ───────
RED   = HexColor('#D72027')
BLUE  = HexColor('#0E2D70')
INK   = HexColor('#1a1a1a')
MUTED = HexColor('#666666')
DIM   = HexColor('#9CA3AF')
RULE  = HexColor('#E5E7EB')

PAGE_W, PAGE_H = LETTER
MARGIN_L = 0.6 * inch
MARGIN_R = 0.6 * inch
MARGIN_T = 0.55 * inch
MARGIN_B = 0.55 * inch
CONTENT_W = PAGE_W - MARGIN_L - MARGIN_R

# ─────── state ───────
class Cursor:
    def __init__(self, c):
        self.c = c
        self.y = PAGE_H - MARGIN_T
        self.field_n = 0  # unique field names

    def need(self, h):
        """Ensure h points of space remain. New page if not."""
        if self.y - h < MARGIN_B:
            self.new_page()

    def new_page(self):
        self.c.showPage()
        self.page_header()
        self.y = PAGE_H - MARGIN_T - 0.3 * inch

    def page_header(self):
        # small running header on continuation pages
        self.c.setFillColor(MUTED)
        self.c.setFont('Helvetica-Bold', 8)
        self.c.drawString(MARGIN_L, PAGE_H - 0.35 * inch, 'JD PREMIER LOGISTICS · SITE CONTENT QUESTIONNAIRE')
        self.c.setFillColor(RED)
        self.c.rect(MARGIN_L, PAGE_H - 0.42 * inch, CONTENT_W, 1.2, fill=1, stroke=0)

    def name(self, prefix):
        self.field_n += 1
        return f'{prefix}_{self.field_n}'


def cover(c, cur):
    # Logo
    if LOGO.exists():
        c.drawImage(str(LOGO), MARGIN_L, PAGE_H - MARGIN_T - 0.65 * inch,
                    width=1.4 * inch, height=0.72 * inch,
                    preserveAspectRatio=True, mask='auto')

    # Right-side meta
    c.setFillColor(MUTED)
    c.setFont('Helvetica', 9)
    c.drawRightString(PAGE_W - MARGIN_R, PAGE_H - MARGIN_T - 0.05 * inch, 'Site Content Questionnaire')
    c.setFillColor(BLUE)
    c.setFont('Helvetica-Bold', 9)
    c.drawRightString(PAGE_W - MARGIN_R, PAGE_H - MARGIN_T - 0.22 * inch, 'Jacob Davis · JD Premier Logistics')

    # Brand-red rule
    c.setFillColor(RED)
    c.rect(MARGIN_L, PAGE_H - MARGIN_T - 0.78 * inch, CONTENT_W, 2.5, fill=1, stroke=0)

    # Title block
    y = PAGE_H / 2 + 0.6 * inch
    c.setFillColor(RED)
    c.setFont('Helvetica-Bold', 9)
    c.drawString(MARGIN_L, y, '— LET\'S BUILD YOUR SITE')
    y -= 0.55 * inch
    c.setFillColor(BLUE)
    c.setFont('Helvetica-Bold', 38)
    c.drawString(MARGIN_L, y, '10 short questions.')
    y -= 0.5 * inch
    c.drawString(MARGIN_L, y, 'Mostly check boxes.')

    y -= 0.5 * inch
    c.setFillColor(INK)
    c.setFont('Helvetica', 12)
    blurb = [
        'Most answers take a few seconds — check, type, or fill in.',
        'Three questions need a sentence or two. Open this PDF in Preview',
        '(Mac) or Acrobat, fill it out, and email it back.',
    ]
    for line in blurb:
        c.drawString(MARGIN_L, y, line)
        y -= 0.22 * inch

    # Footer
    c.setStrokeColor(RULE)
    c.setLineWidth(0.5)
    c.line(MARGIN_L, MARGIN_B + 0.4 * inch, PAGE_W - MARGIN_R, MARGIN_B + 0.4 * inch)
    c.setFillColor(MUTED)
    c.setFont('Helvetica', 9)
    c.drawString(MARGIN_L, MARGIN_B + 0.2 * inch, 'Prepared by Chase Kellis · App Catalyst')
    c.drawRightString(PAGE_W - MARGIN_R, MARGIN_B + 0.2 * inch,
                      'Return: chase@appcatalyst.org · (714) 458-1163')

    c.showPage()
    cur.page_header()
    cur.y = PAGE_H - MARGIN_T - 0.3 * inch


def section_head(cur, num, title, blurb=None):
    c = cur.c
    cur.need(0.7 * inch + (0.25 * inch if blurb else 0))

    # Red num badge
    badge_w = 0.32 * inch
    badge_h = 0.22 * inch
    c.setFillColor(BLUE)
    c.roundRect(MARGIN_L, cur.y - badge_h + 0.03 * inch, badge_w, badge_h, 3, fill=1, stroke=0)
    c.setFillColor(white)
    c.setFont('Helvetica-Bold', 11)
    c.drawCentredString(MARGIN_L + badge_w / 2, cur.y - badge_h + 0.1 * inch, str(num))

    # Title
    c.setFillColor(BLUE)
    c.setFont('Helvetica-Bold', 14)
    c.drawString(MARGIN_L + badge_w + 0.1 * inch, cur.y - 0.13 * inch, title)
    cur.y -= 0.28 * inch

    if blurb:
        c.setFillColor(MUTED)
        c.setFont('Helvetica', 9.5)
        # naive wrap
        max_w = CONTENT_W - 0.4 * inch
        words = blurb.split()
        line = ''
        for w in words:
            test = (line + ' ' + w).strip()
            if c.stringWidth(test, 'Helvetica', 9.5) <= max_w:
                line = test
            else:
                c.drawString(MARGIN_L + 0.4 * inch, cur.y, line)
                cur.y -= 0.16 * inch
                line = w
        if line:
            c.drawString(MARGIN_L + 0.4 * inch, cur.y, line)
            cur.y -= 0.16 * inch

    cur.y -= 0.05 * inch


def checkbox_row(cur, label, prefix='q', write_field=False, write_field_w=None):
    """Render: [ ] label  [optional inline text input]"""
    c = cur.c
    cur.need(0.32 * inch)
    x = MARGIN_L + 0.4 * inch
    box_size = 11
    box_y = cur.y - box_size + 1

    # AcroForm checkbox
    c.acroForm.checkbox(
        name=cur.name(prefix),
        x=x, y=box_y, size=box_size,
        borderColor=BLUE, fillColor=white, textColor=BLUE,
        borderWidth=1, buttonStyle='cross',
    )

    # Label
    c.setFillColor(INK)
    c.setFont('Helvetica', 10.5)
    label_x = x + box_size + 6
    c.drawString(label_x, cur.y - box_size + 3, label)

    if write_field:
        # Write-in text field after the label
        label_w = c.stringWidth(label, 'Helvetica', 10.5)
        input_x = label_x + label_w + 6
        input_w = write_field_w or (PAGE_W - MARGIN_R - input_x)
        c.acroForm.textfield(
            name=cur.name(prefix + '_write'),
            x=input_x, y=cur.y - box_size + 0,
            width=input_w, height=box_size + 4,
            borderColor=DIM, fillColor=white, textColor=INK,
            fontName='Helvetica', fontSize=10, borderWidth=0,
            forceBorder=False,
        )
        # underline under the field
        c.setStrokeColor(DIM)
        c.setLineWidth(0.5)
        c.line(input_x, cur.y - box_size - 1, input_x + input_w, cur.y - box_size - 1)

    cur.y -= 0.27 * inch


def text_line(cur, label=None, label_w=1.4 * inch, prefix='q', height=18):
    """Row with optional left label, then a full-width text input."""
    c = cur.c
    cur.need(height + 6)
    x = MARGIN_L + 0.4 * inch
    if label:
        c.setFillColor(MUTED)
        c.setFont('Helvetica-Bold', 9)
        c.drawString(x, cur.y - 12, label)
        input_x = x + label_w
    else:
        input_x = x
    input_w = PAGE_W - MARGIN_R - input_x
    c.acroForm.textfield(
        name=cur.name(prefix),
        x=input_x, y=cur.y - height + 2,
        width=input_w, height=height,
        borderColor=DIM, fillColor=white, textColor=INK,
        fontName='Helvetica', fontSize=10, borderWidth=0,
        forceBorder=False,
    )
    c.setStrokeColor(DIM)
    c.setLineWidth(0.5)
    c.line(input_x, cur.y - height + 1, input_x + input_w, cur.y - height + 1)
    cur.y -= height + 8


def small_label(cur, txt):
    c = cur.c
    cur.need(0.22 * inch)
    c.setFillColor(MUTED)
    c.setFont('Helvetica-Bold', 9.5)
    c.drawString(MARGIN_L + 0.4 * inch, cur.y - 10, txt)
    cur.y -= 0.22 * inch


def gap(cur, h=0.18 * inch):
    cur.y -= h


# ─────── build ───────
c = canvas.Canvas(str(OUT), pagesize=LETTER)
c.setTitle('JD Premier Logistics — Site Content Questionnaire')
c.setAuthor('Chase Kellis, App Catalyst')
cur = Cursor(c)

cover(c, cur)

# 1 · Tagline
section_head(cur, 1, 'Tagline & headline',
             'Current homepage line: "Freight that moves. Service that delivers."')
checkbox_row(cur, 'Keep "Freight that moves. Service that delivers."', prefix='q1')
checkbox_row(cur, 'Replace with:', prefix='q1', write_field=True)
small_label(cur, 'Any tagline from ChatGPT (or that you say to customers all the time) you want included?')
text_line(cur, prefix='q1_tag')
text_line(cur, prefix='q1_tag')

# 2 · Stats
section_head(cur, 2, 'Numbers to promote — pick 4',
             'Stat strip on the homepage. Check 4 and write your real number on the right.')
stat_opts = [
    'States served', 'Years in business', 'Loads per month / per year',
    'Trucks or carriers in network', 'On-time delivery %', '24/7 dispatch',
    'Repeat-customer rate', 'Average quote response time', 'Other:',
]
for s in stat_opts:
    checkbox_row(cur, s, prefix='q2', write_field=True, write_field_w=2.4 * inch)

# 3 · Services
section_head(cur, 3, 'Services offered',
             'Current: Flatbed, Dry Van, Refrigerated, Heavy Haul, Oversize, Hot Shot / Box Truck.')
small_label(cur, 'Add to the list:')
for s in ['Drayage / port', 'Intermodal (rail)', 'Cross-border (US ↔ MX/CA)',
          'Final mile', 'Hazmat', 'Auto / power-only']:
    checkbox_row(cur, s, prefix='q3')
checkbox_row(cur, 'Other:', prefix='q3', write_field=True)
small_label(cur, "Remove from the list (anything you don't actually offer):")
text_line(cur, prefix='q3_rm')

# 4 · Values
section_head(cur, 4, 'What we believe',
             'Three cards on the homepage. Currently: Service first · Built on trust · Texas-grown.')
checkbox_row(cur, 'Keep those three as-is', prefix='q4')
small_label(cur, 'Or write your 3 (one short phrase each — what you actually tell customers):')
text_line(cur, prefix='q4_val')
text_line(cur, prefix='q4_val')
text_line(cur, prefix='q4_val')

# 5 · Story
section_head(cur, 5, 'Your real story (About page)',
             'A couple sentences on each:')
for label in ['Founded', 'Why started', 'Who\'s behind it', 'Proud milestone', 'Anything else']:
    text_line(cur, label=label, prefix='q5')

# 6 · Contact info
section_head(cur, 6, 'Real contact info', 'For the contact page + footer.')
for label in ['Dispatch phone', 'Inbound email', 'Address', 'Hours',
              'Instagram', 'Facebook', 'LinkedIn', 'Other']:
    text_line(cur, label=label, prefix='q6')

# 7 · Quote destination
section_head(cur, 7, 'Where should quote requests go?',
             'Right now the form pretends to send. Pick the real destination(s):')
checkbox_row(cur, 'Email to:', prefix='q7', write_field=True)
checkbox_row(cur, 'CC / BCC also to:', prefix='q7', write_field=True)
checkbox_row(cur, 'Text/SMS notification to:', prefix='q7', write_field=True)
checkbox_row(cur, 'Save to Google Sheet', prefix='q7')
checkbox_row(cur, 'Push into CRM:', prefix='q7', write_field=True)

# 8 · Photos
section_head(cur, 8, 'Photography',
             'Currently using stock truck photos. Have your own?')
checkbox_row(cur, "Yes — I'll send photos of our trucks / fleet / team", prefix='q8')
checkbox_row(cur, 'Use the stock photos for now', prefix='q8')
checkbox_row(cur, 'Other:', prefix='q8', write_field=True)

# 9 · Optional pages
section_head(cur, 9, 'Anything missing? — optional add-ons',
             'Check what you want me to add. Each adds time but all are valuable.')
for s in ['Carrier portal (drivers / partners access loads)',
          'Shipper portal (customers track shipments)',
          'Industries served (manufacturing, retail, ag, oil & gas, etc.)',
          'Customer testimonials / shipper logos',
          'Service area map',
          'Careers / "Drive for us" page',
          'News / blog']:
    checkbox_row(cur, s, prefix='q9')
checkbox_row(cur, 'Other:', prefix='q9', write_field=True)

# 10 · CTA
section_head(cur, 10, 'What action matters most?',
             'Right now: Request a Quote (primary) and Call Dispatch. Pick what should be the BIG button.')
checkbox_row(cur, 'Get quote requests (current default)', prefix='q10')
checkbox_row(cur, 'Get calls — make "Call Dispatch" the big button', prefix='q10')
checkbox_row(cur, 'Recruit carriers — add "Become a Carrier"', prefix='q10')
checkbox_row(cur, 'Recruit drivers — add "Drive for us"', prefix='q10')
checkbox_row(cur, 'Other:', prefix='q10', write_field=True)

# Final footer tag
cur.need(0.6 * inch)
gap(cur, 0.3 * inch)
c.setStrokeColor(RULE)
c.line(MARGIN_L, cur.y, PAGE_W - MARGIN_R, cur.y)
cur.y -= 0.2 * inch
c.setFillColor(BLUE)
c.setFont('Helvetica-Bold', 9)
c.drawCentredString(PAGE_W / 2, cur.y - 8,
                    'JD Premier Logistics · Wills Point, TX · Return to chase@appcatalyst.org · (714) 458-1163')

c.save()
print(f'wrote {OUT}')
